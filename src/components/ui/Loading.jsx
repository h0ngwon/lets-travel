import React from 'react';
import styled from 'styled-components';
import packman from 'assets/Bean Eater-0.7s-247px.gif'
const Loading = () => {
    return <Background>
        <LoadingText>여행을 위한 준비중이에요!!</LoadingText>
        <img src={packman} alt='로딩중'/>
    </Background>
};

const Background = styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background: #ffffffb7;
    z-index: 999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const LoadingText = styled.div`
    font-family: 'GmarketSansTTFMedium';
    text-align: center;
`

export default Loading;
