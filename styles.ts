import styled from "styled-components/native";

export const Container = styled.View`
    flex:1;
    background-color: ${({theme})=> theme.ghost};
    align-items: center;
    justify-content: center;
`


export const Texto = styled.Text`
    font-size:20px;
    font-weight: bold;
    color : #aaa;

`