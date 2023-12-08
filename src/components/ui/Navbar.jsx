import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

function Navbar() {
    const navigate = useNavigate();
    return (
        <NavContainer>
            <MainLogo onClick={() => navigate('/')}>LET'S TRAVEL</MainLogo>
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
    font-size: 35px;
    font-family: Milton Keynes;
    cursor: pointer;
`;
export default Navbar;
