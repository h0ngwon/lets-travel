import React from 'react';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import Modal from 'react-modal';
// import { useState, useEffect } from 'react';
// import {
//     createUserWithEmailAndPassword,
//     signInWithEmailAndPassword,
//     onAuthStateChanged,
//     signOut,
// } from 'firebase/auth';
// import { auth } from './firebase';

const Home = () => {
    //     const [email, setEmail] = useState('');
    //     const [password, setPassword] = useState('');
    //     const [currentUser, setCurrentUser] = useState(null);

    // const onChange = (event) => {
    //     const {
    //         target: { name, value },
    //     } = event;
    //     if (name === 'email') {
    //         setEmail(value);
    //     }
    //     if (name === 'password') {
    //         setPassword(value);
    //     }
    // };

    // const signUp = (event) => {
    //     event.preventDefault();
    // };
    // const signIn = (event) => {
    //     event.preventDefault();
    // };
    // const logOut = (event) => {
    //     event.preventDefault();
    // };

    return (
        <StPage>
            <StContainer>
                <StH1>Let's Travel</StH1>
                <StH2>여행하자</StH2>
                <StBtn
                    onClick={() => {
                        Swal.fire({
                            imageUrl: '/imgs/airplain_icon.ico',
                            imageWidth: 300,
                            imageHeight: 200,
                            title: '로그인 후 이용이 가능합니다.',
                            text: '로그인 하시겠습니까?',
                            showCancelButton: true,
                            confirmButtonText: '예',
                            cancelButtonText: '아니오',
                            confirmButtonColor: '#429f50',
                            cancelButtonColor: '#d33',
                        }).then((result) => {
                            if (result.isConfirmed) {
                                // <>
                                //     <h2>로그인 페이지</h2>
                                //     <form>
                                //         <div>
                                //             <label>이메일 : </label>
                                //             <input
                                //                 type='email'
                                //                 value={email}
                                //                 name='email'
                                //                 onChange={onChange}
                                //                 required
                                //             ></input>
                                //         </div>
                                //         <div>
                                //             <label>비밀번호 : </label>
                                //             <input
                                //                 type='password'
                                //                 value={password}
                                //                 name='password'
                                //                 onChange={onChange}
                                //                 required
                                //             ></input>
                                //         </div>
                                //         <button onClick={signUp}>
                                //             회원가입
                                //         </button>
                                //         <button onClick={signIn}>로그인</button>
                                //         <button onClick={logOut}>
                                //             로그아웃
                                //         </button>
                                //     </form>
                                // </>;
                            } else if (result.isDismissed) {
                                <Navigate to='/' />;
                            }
                        });
                    }}
                >
                    여행하러가기
                </StBtn>
            </StContainer>
        </StPage>
    );
};

export default Home;

const StPage = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #00dbdb;
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
