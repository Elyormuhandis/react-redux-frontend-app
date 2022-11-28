

import styled from 'styled-components'

let num = 0;
const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

num = (getRandomInt(0, 9));


export const LoginStyle = styled.div`
    width: 100vw;
    height: 100vh;
    background-image: url(${require(`../../assets/img/bg${num}.jpg`)});
    background-repeat: no-repeat;
    background-size: cover;
    z-index: -1;
`

export const LoginContainerStyle = styled.div`
    width: 100%;
    height: 100%;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
`
export const FromStyle = styled.form`
    width: 350px;
    `
export const FromControlStyle = styled.input`
    width: 20rem;
    margin-bottom: 15px;
    padding: 15px 25px;
    border-radius: 50px;
    outline: none;
    border: none;
    color:rgb(178, 186, 194);
    letter-spacing: 2px;
    background-color: rgba(0, 0, 0, 0.4);
    font-size: small;
    transition: all .3s;
    &:hover{
        background-color: rgba(0, 0, 0, 0.7);
        
    }
    &::placeholder{
        color: rgb(178, 186, 194);
        font-size: small;
    }
    
    `

export const BtnStyle = styled.button`
    margin-top: 15px;
    background-color: rgba(183, 7, 7, 0.5);
    font-size: small;
    transition: all .3s;
    width: 20rem;
    margin-bottom: 15px;
    padding: 15px 25px;
    border-radius: 50px;
    outline: none;
    border: none;
    color:rgb(178, 186, 194);
    &:hover{
        transition: all .3s;
        cursor: pointer;
        color: white;
        background-color: rgba(250, 9, 53, 0.8);

    }
`