import React from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './ui/Navbar';

const Home = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    return (
        <>
            <Navbar />
            <StPage>
                <StContainer>
                    <StH1>Let's Travel</StH1>
                    <StH2>여행하자</StH2>
                    <StBtn
                        onClick={() => {
                            if (email && password) {
                                navigate('/survey');
                            } else {
                                // 로그인 여부 확인
                                Swal.fire({
                                    imageUrl: '/imgs/airplain_icon.ico',
                                    imageWidth: 300,
                                    imageHeight: 100,
                                    title: '로그인 후 이용이 가능합니다.',
                                    text: '로그인 하시겠습니까?',
                                    color: '#00a08d',
                                    showCancelButton: true,
                                    confirmButtonText: '좋아요',
                                    cancleButtonText: '싫어요',
                                    confirmButtonColor: '#00a08d',
                                    cancelButtonColor: '#ad3838',
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        Swal.fire({
                                            imageUrl: '/imgs/airplain_icon.ico',
                                            imageWidth: 300,
                                            imageHeight: 200,
                                            title: "Let's Travel !",
                                            color: '#00a08d',
                                            showCancelButton: true,
                                            confirmButtonText: '로그인',
                                            cancelButtonText: '회원가입',
                                            confirmButtonColor: '#00a08d',
                                            cancelButtonColor: '#00a08d',
                                        }).then((result) => {
                                            if (result.isConfirmed) {
                                                (async () => {
                                                    const {
                                                        value: formValues,
                                                    } = await Swal.fire({
                                                        title: '로그인',
                                                        html:
                                                            '<label style="padding:10px">이메일</label> <input id="email" class="swal2-input" placeholder="이메일을 입력해주세요."> <br/>' +
                                                            '<label>비밀번호</label> <input id="password" class="swal2-input" placeholder="비밀번호를 입력해주세요.">',
                                                        focusConfirm: false,
                                                        preConfirm: () => {
                                                            return [
                                                                document.getElementById(
                                                                    'email',
                                                                ).value,
                                                                document.getElementById(
                                                                    'password',
                                                                ).value,
                                                            ];
                                                        },
                                                    });
                                                    if (
                                                        formValues[0] !== '' &&
                                                        formValues[1] !== ''
                                                    ) {
                                                        setEmail(formValues[0]);
                                                        setPassword(
                                                            formValues[1],
                                                        );
                                                        await Swal.fire({
                                                            position: 'center',
                                                            width: 400,
                                                            padding: '60px',
                                                            icon: 'success',
                                                            title: '로그인 성공',
                                                            showConfirmButton: false,
                                                            timer: 1500,
                                                        });
                                                    } else {
                                                        if (
                                                            formValues[0] ===
                                                                '' &&
                                                            formValues[1] === ''
                                                        ) {
                                                            await Swal.fire({
                                                                icon: 'error',
                                                                title: '잘못된 정보를 입력하였습니다.',
                                                                text: '이메일 주소와 비밀번호를 다시 확인해주세요!',
                                                                footer: '<a href="">비밀번호를 잊어버리셨나요?</a>',
                                                            });
                                                        }
                                                    }
                                                })();
                                            } else if (result.isDismissed) {
                                                alert('회원가입');
                                            }
                                        });
                                    } else if (result.isDismissed) {
                                        navigate('/');
                                    }
                                });
                            }
                        }}
                    >
                        여행하러가기
                    </StBtn>
                    {console.log('email : ', email)}
                    {console.log('password : ', password)}
                </StContainer>
            </StPage>
        </>
    );
};

export default Home;

const StPage = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #71d5c9;
`;

const StContainer = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const StH1 = styled.h1`
    font-size: 50px;
    margin-bottom: 50px;
`;

const StH2 = styled.h2`
    font-size: 30px;
    margin-bottom: 70px;
`;

const StBtn = styled.button`
    width: 250px;
    height: 50px;
    border: none;
    border-radius: 20px;
    background-color: white;
    font-size: 20px;
`;
