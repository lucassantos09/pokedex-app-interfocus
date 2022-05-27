import React from 'react';
import LottieView from 'lottie-react-native';
import {  Container } from './styles';

function SplashScreen() {
    return (

        <Container>
                <LottieView source={require('../../assets/animations/pokeball-load.json')} autoPlay loop style={{width: 75, height:75}}/>
        </Container>
    )
}


export default SplashScreen;