import React from 'react';
import { styled } from 'styled-components';

function Footer() {
    return (
        <FooterContainer>
            <h4>여행하자</h4>
            <p>copyright</p>
        </FooterContainer>
    );
}

const FooterContainer = styled.div`
    /* bottom: 0;
    position: absolute; */
    width: 100vw;
    background-color: #71d5c9;
    color: white;
    padding: 30px 0;
    display: flex;
    gap: 50px;
    justify-content: center;
    border-top: 1px solid white;
`;

export default Footer;
