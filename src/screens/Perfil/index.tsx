import React from "react";
import { Image } from "react-native";
import { useAuth } from "../../hooks/auth";
import { BackgroundImage, BotaoSair, Container, Conteudo, Header, Sair, Titulo } from "./styles";

function Perfil (){

const {usuario, logoff} = useAuth();

    return (
        <Container>
            <Header>
                <Titulo>Perfil</Titulo>
            </Header>
            <Conteudo>
                <BackgroundImage>
                    <Image
                        source={{
                            uri: 'https://avatars.githubusercontent.com/u/81420117?s=400&u=46a2908c657788aaa4aaec98e70f828f9fb99d9f&v=4'
                        }}
                        style={{
                            width: 130,
                            height: 130,
                            borderRadius: 65
                        }} 
                    />
                </BackgroundImage>
                <Titulo>{usuario?.usuarioNome}</Titulo>
                <BotaoSair
                onPress={logoff}
                >
                    <Sair>Sair</Sair>
                </BotaoSair>
            </Conteudo>
        </Container>
    )
}

export default Perfil;