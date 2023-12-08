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
const FooterWrap = styled.div`
    min-height: 100%;
    position: relative;
`;
const FooterContainer = styled.div`
    position: relative;
    width: 100%;
    background-color: #71d5c9;
    color: white;
    padding: 30px 0;
    display: flex;
    gap: 30px;
    justify-content: center;
`;

export default Footer;
