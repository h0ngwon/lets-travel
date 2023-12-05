import React from 'react';
import { styled } from 'styled-components';

function Navbar() {
    return (
        <NavContainer>
            <MainLogo>LET'S TRAVEL</MainLogo>
        </NavContainer>
    );
}

const NavContainer = styled.div`
    width: 100vw;
    height: 70px;
    border-bottom: 1px solid #71d5c9;
    display: flex;
    align-items: center;
`;
const MainLogo = styled.h1`
    width: 300px;
    height: 50px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 50px;
    color: #71d5c9;
    font-size: 30px;
    font-family: ClimateCrisisKR-2010;
`;
export default Navbar;
