import React, { ReactNode, useContext, useEffect, useState } from "react";
import { FavoritoDTO } from "../dtos/FavoritoDTO";
import { FavoriteContext } from "../contexts/FavoriteContext";
import { PokemonDTO } from "../dtos/PokemonDTO";
import { useAuth } from "./auth";
import AsyncStorage from "@react-native-async-storage/async-storage";


interface FavoriteProviderProps {
    children: ReactNode;
}

const FAVORITOS_KEY = '@pokedex:favoritos';



function FavoriteProvider({ children }: FavoriteProviderProps) {
    const { usuario } = useAuth();
    const [favoritos, setFavoritos] = useState<FavoritoDTO[]>([]);    

    async function getFavoritos() {
        const favoritosStorage = await AsyncStorage.getItem(FAVORITOS_KEY);
        if (favoritosStorage) {
            const favoritosParse = JSON.parse(favoritosStorage) as FavoritoDTO[];
            setFavoritos(favoritosParse);
        }
    }

    async function removeFavorito(id: number) {
        const filtrados = favoritos.filter(f => f.pokemon.id !== id);
        await AsyncStorage.setItem(FAVORITOS_KEY, JSON.stringify(filtrados));
        setFavoritos(filtrados);
    }

    async function verificaFavoritado(id: number) {
        const favoritosStorage = await AsyncStorage.getItem(FAVORITOS_KEY);
        const favoritosParse = favoritosStorage ? JSON.parse(favoritosStorage) as FavoritoDTO[] : [];
        return favoritosParse.some(f => f.pokemon.id == id);
    }

    async function addFavorito(pokemon: PokemonDTO) {
        const pokemonFavorito = await verificaFavoritado(pokemon.id);

        if (pokemonFavorito) {
            removeFavorito(pokemon.id);
        } else {
            favoritos.push({
                id: Math.random(),
                pokemon,
                // Exclamação na frente para falar que vai ter um dado e que não vai ser null
                usuario: usuario!
            });
        }
        await AsyncStorage.setItem(FAVORITOS_KEY, JSON.stringify(favoritos));
    }


    useEffect(() => {
        getFavoritos();
    }, []);

    return (
        <FavoriteContext.Provider value={{
            favoritos,
            getFavoritos,
            removeFavorito,
            addFavorito,
            verificaFavoritado
        }}>
            {children}
        </FavoriteContext.Provider>
    )
}

function useFavorite() {
    const context = useContext(FavoriteContext);

    return context;
}

export { FavoriteProvider, useFavorite }