import airplane from 'assets/airplane.png';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import Swal from 'sweetalert2';
import { auth } from '../../config/firebaseConfig';

function Navbar() {
    const navigate = useNavigate();

    // 강제로 랜더링하기 위해 선언한 함수
    const [render, setRender] = useState(true);

    // 로그인 정보 저장
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (auth.currentUser || user) {
                setRender(!render);
            }
        });
    }, []);

    const logOut = async () => {
        await signOut(auth);
        localStorage.removeItem('userEmail');
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
            <MainLogo onClick={() => navigate('/')}>
                Let's Travel <MainLogoImage src={airplane} />
            </MainLogo>
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
    width: 360px;
    height: 60px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 10px 0 0 80px;
    color: #71d5c9;
    font-size: 35px;
    font-family: Avigea;
    cursor: pointer;
`;

const MainLogoImage = styled.img`
    width: 60px;
    height: 60px;
    margin-left: 5px;
`;

const LogoutBtn = styled.button`
    margin-right: 80px;
    font-size: 17px;
    color: #71d5c9;
    background-color: white;
    border-style: none;
    font-family: SCDream6;
    cursor: pointer;
`;

export default Navbar;
