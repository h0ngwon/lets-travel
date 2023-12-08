import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import Swal from 'sweetalert2';

function Navbar() {
    const navigate = useNavigate();

    // 강제로 랜더링하기 위해 선언한 함수
    const [render, setRender] = useState(true);

    // 로그인 정보 저장
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (auth.currentUser) {
                setRender(!render);
            }
        });
    }, []);

    const logOut = async () => {
        await signOut(auth);
        Swal.fire({
            position: 'center',
            width: 400,
            padding: '60px',
            icon: 'success',
            title: '로그아웃!',
            showConfirmButton: false,
            timer: 1500,
        }).then(() => {
            navigate('/');
        });
    };
    return (
        <NavContainer>
            <MainLogo onClick={() => navigate('/')}>LET'S TRAVEL</MainLogo>
            {auth.currentUser && (
                <LogoutBtn onClick={() => logOut()}>로그아웃</LogoutBtn>
            )}
        </NavContainer>
    );
}

const NavContainer = styled.div`
    width: 100vw;
    height: 70px;
    border-bottom: 1px solid #71d5c9;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const MainLogo = styled.h1`
    width: 300px;
    height: 60px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 80px;
    height: 50px;
    color: #71d5c9;
    font-size: 40px;
    font-family: Kalimar;
    cursor: pointer;
`;

const LogoutBtn = styled.button`
    margin-right: 50px;
    font-size: 20px;
    color: #71d5c9;
    border: #71d5c9 solid 2px;
    border-radius: 5px;
    background-color: white;
    font-family: Milton Keynes;
    cursor: pointer;
`;

export default Navbar;
