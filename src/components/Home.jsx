import React from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './ui/Navbar';

const Home = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passCheck, setPassCheck] = useState('');

    // '여행하러가기' 버튼 클릭 시, 실행
    const askLoginButtonHandler = () => {
        Swal.fire({
            imageUrl: '/imgs/airplain_icon.ico',
            imageWidth: 300,
            imageHeight: 100,
            title: '로그인 후 이용이 가능합니다.',
            text: '로그인 하시겠습니까?',
            color: '#00a08d',
            showCancelButton: true,
            confirmButtonText: 'Login',
            cancelButtonText: 'Cancel',
            confirmButtonColor: '#00a08d',
            cancelButtonColor: '#5f5f5f',
        }).then((result) => {
            if (result.isConfirmed) {
                // 'Login' 버튼 클릭 시, 로그인/회원가입 Modal로 이동
                loginSignupButtonHandler();
            } else if (result.isDismissed) {
                // 'Cancel' 버튼 클릭 시, 홈 화면으로 이동
                navigate('/');
            }
        });
    };

    // 'Login' 버튼 클릭 시, 실행
    const loginSignupButtonHandler = () => {
        Swal.fire({
            imageUrl: '/imgs/airplain_icon.ico',
            imageWidth: 300,
            imageHeight: 200,
            title: "Let's Travel !",
            color: '#00a08d',
            showDenyButton: true,
            confirmButtonText: '로그인',
            confirmButtonColor: '#00a08d',
            denyButtonText: '회원가입',
            denyButtonColor: '#00a08d',
        }).then((result) => {
            if (result.isConfirmed) {
                // '로그인' 버튼 클릭 시, 로그인 Modal 실행
                loginHandler();
            } else if (result.isDenied) {
                // '회원가입' 버튼 클릭 시, 회원가입 Modal 실행
                signupHandler();
            }
        });
    };

    // '로그인' 버튼 클릭 시, 실행
    const loginHandler = () => {
        (async () => {
            const { value: formValues } = await Swal.fire({
                title: '로그인',
                html:
                    '<label>이메일</label> <input required id="email" type="email" class="swal2-input" placeholder="이메일을 입력해주세요."> <br/>' +
                    '<label>비밀번호</label> <input id="password" type="password" class="swal2-input" placeholder="비밀번호를 입력해주세요.">',
                focusConfirm: false,
                confirmButtonColor: '#00a08d',
                confirmButtonText: '로그인하기',
                preConfirm: () => {
                    return [
                        document.getElementById('email').value,
                        document.getElementById('password').value,
                    ];
                },
            });
            if (formValues) {
                // 입력된 값 (배열) 매개변수로 전달 -> 유효성 검사 실행
                validationCheckHandler(formValues);
            }
        })();
    };

    // '회원가입' 버튼 클릭 시, 실행
    const signupHandler = () => {
        (async () => {
            const { value: formValues } = await Swal.fire({
                title: '회원가입',
                html:
                    '<label style="padding:9px">이메일</label> <input id="email" class="swal2-input" placeholder="이메일을 입력하세요."> <br/>' +
                    '<label>비밀번호</label> <input id="password" class="swal2-input" placeholder="비밀번호를 입력하세요."> <br/>' +
                    '<label style="padding:18px">확인</label> <input id="passCheck" class="swal2-input" placeholder="비밀번호를 재입력하세요.">',
                focusConfirm: false,
                confirmButtonColor: '#00a08d',
                confirmButtonText: '가입하기',
                preConfirm: () => {
                    return [
                        document.getElementById('email').value,
                        document.getElementById('password').value,
                        document.getElementById('passCheck').value,
                    ];
                },
            });
            if (formValues) {
                // 입력된 값 (배열) 매개변수로 전달 -> 유효성 검사 실행
                validationCheckHandler(formValues);
            }
        })();
    };

    // 유효성 검사 실행
    const validationCheckHandler = (formValues) => {
        if (formValues) {
            // '로그인하기' 버튼 클릭 시, 유효성 검사 실행
            if (formValues.length === 2) {
                if (formValues[0] !== '' && formValues[1] !== '') {
                    setEmail(formValues[0]);
                    setPassword(formValues[1]);

                    // 로그인 성공 alert
                    successAlertHandler(formValues);
                } else {
                    // 로그인 실패 alert
                    failAlertHandler(formValues);
                }
            }
            // '가입하기' 버튼 클릭 시, 유효성 검사 실행
            else {
                if (
                    formValues[0] !== '' &&
                    formValues[1] !== '' &&
                    formValues[2] !== ''
                ) {
                    // 비밀번호, 확인 비밀번호가 일치하지 않는 경우, alert
                    if (formValues[1] !== formValues[2]) {
                        Swal.fire({
                            icon: 'warning',
                            title: '비밀번호를 확인해주세요.',
                            text: '비밀번호가 일치하지 않습니다.',
                            padding: '20px',
                            confirmButtonColor: '#00a08d',
                            confirmButtonText: '회원가입 하러가기',
                        }).then(() => {
                            signupHandler();
                        });
                    } else {
                        setEmail(formValues[0]);
                        setPassword(formValues[1]);
                        setPassCheck(formValues[2]);

                        // 회원가입 성공 alert
                        successAlertHandler(formValues);
                    }
                } else {
                    // 회원가입 실패 alert
                    failAlertHandler(formValues);
                }
            }
        }
    };

    // 로그인, 회원가입 성공 시, alert 실행
    const successAlertHandler = (formValues) => {
        // 로그인 성공 시, '로그인 성공!' alert
        if (formValues.length === 2) {
            Swal.fire({
                position: 'center',
                width: 400,
                padding: '60px',
                icon: 'success',
                title: '로그인 성공!',
                showConfirmButton: false,
                timer: 1500,
            });
        }
        // 회원가입 성공 시, '회원가입 성공!' alert -> 로그인 Modal로 이동
        else {
            Swal.fire({
                position: 'center',
                width: 400,
                padding: '60px',
                icon: 'success',
                title: '회원가입 성공!',
                showConfirmButton: false,
                timer: 1500,
            }).then(() => {
                loginHandler();
            });
        }
    };

    // 로그인, 회원가입 실패 시, alert
    const failAlertHandler = (formValues) => {
        // 로그인 실패 시, alert
        if (formValues.length === 2) {
            console.log('formValues.length : ', formValues.length);
            // 이메일, 비밀번호 둘 다 입력하지 않은 경우
            if (formValues[0] === '' && formValues[1] === '') {
                Swal.fire({
                    icon: 'warning',
                    title: '잘못된 정보를 입력하였습니다.',
                    text: '이메일 주소와 비밀번호를 다시 확인해주세요!',
                    confirmButtonColor: '#00a08d',
                    confirmButtonText: '로그인 하러가기',
                }).then(() => {
                    loginHandler();
                });
            } else {
                // 이메일을 입력하지 않은 경우
                if (formValues[0] === '') {
                    Swal.fire({
                        icon: 'warning',
                        title: '이메일 주소를 입력해주세요.',
                        text: '이메일 주소를 입력하지 않았습니다.',
                        padding: '20px',
                        confirmButtonColor: '#00a08d',
                        confirmButtonText: '로그인 하러가기',
                    }).then(() => {
                        loginHandler();
                    });
                }
                // 비밀번호를 입력하지 않은 경우
                else {
                    Swal.fire({
                        icon: 'warning',
                        title: '비밀번호를 입력해주세요.',
                        text: '비밀번호를 입력하지 않았습니다.',
                        padding: '20px',
                        confirmButtonColor: '#00a08d',
                        confirmButtonText: '로그인 하러가기',
                    }).then(() => {
                        loginHandler();
                    });
                }
            }
        }
        // 회원가입 실패 시, alert
        else {
            if (
                formValues[0] === '' ||
                formValues[1] === '' ||
                formValues[2] === ''
            ) {
                Swal.fire({
                    icon: 'warning',
                    title: '잘못된 정보를 입력하였습니다.',
                    text: '입력하신 정보를 다시 확인해주세요!',
                    confirmButtonColor: '#00a08d',
                    confirmButtonText: '회원가입 하러가기',
                }).then(() => {
                    signupHandler();
                });
            }
        }
    };

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
                                // '여행하러가기' 버튼 클릭 시, 로그인 여부 확인 Modal 실행
                                askLoginButtonHandler();
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
