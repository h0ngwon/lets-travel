import React from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../config/firebaseConfig';

const Home = () => {
    const navigate = useNavigate();

    // 회원가입 : 파이어베이스에 email, password 저장
    const signUp = async (formValues) => {
        await createUserWithEmailAndPassword(auth, formValues[0], formValues[1])
            // 회원가입 성공 alert
            .then(() => {
                Swal.fire({
                    position: 'center',
                    width: 400,
                    padding: '60px',
                    icon: 'success',
                    title: '회원가입 성공!',
                    showConfirmButton: false,
                    timer: 1500,
                }).then(() => {
                    // 로그인 modal 실행
                    loginHandler();
                });
            })
            // 에러 코드에 따라 에러 alert
            .catch((error) => {
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        return Swal.fire({
                            icon: 'error',
                            title: '이미 가입된 이메일입니다.',
                            text: '이메일 주소를 확인해주세요.',
                            confirmButtonColor: '',
                        }).then(() => {
                            signupHandler();
                        });
                    case 'auth/weak-password':
                        return Swal.fire({
                            icon: 'error',
                            title: '잘못된 비밀번호를 입력하였습니다.',
                            text: '비밀번호는 6글자 이상이어야 합니다.',
                            confirmButtonColor: '#71d5c9',
                        }).then(() => {
                            signupHandler();
                        });
                    case 'auth/network-request-failed':
                        return Swal.fire({
                            icon: 'error',
                            title: '네트워크 연결에 실패 하였습니다.',
                            text: '잠시 후에 다시 시도해 주세요.',
                            confirmButtonColor: '#71d5c9',
                        }).then(() => {
                            signupHandler();
                        });
                    case 'auth/invalid-email':
                        return Swal.fire({
                            icon: 'error',
                            title: '잘못된 이메일 형식입니다.',
                            text: '유효한 이메일 형식으로 작성해주세요.',
                            confirmButtonColor: '#71d5c9',
                        }).then(() => {
                            signupHandler();
                        });
                    default:
                        return Swal.fire({
                            icon: 'error',
                            title: '회원가입에 실패하였습니다.',
                            text: '이메일 주소와 비밀번호를 확인해주세요.',
                            confirmButtonColor: '#71d5c9',
                        }).then(() => {
                            signupHandler();
                        });
                }
            });
    };

    // 로그인 : 파이어베이스에서 email, password 검색
    const login = async (formValues) => {
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                formValues[0],
                formValues[1],
            ).then(() => {
                Swal.fire({
                    position: 'center',
                    width: 400,
                    padding: '60px',
                    icon: 'success',
                    title: '로그인 성공!',
                    showConfirmButton: false,
                    timer: 1500,
                });
            });
            console.log('현재 로그인한 user : ', auth.currentUser);
        } catch (error) {
            console.log('error.code : ', error.code);
            switch (error.code) {
                case 'auth/user-not-found" || "auth/wrong-password':
                    return Swal.fire({
                        icon: 'error',
                        title: '네트워크 연결에 실패 하였습니다.',
                        text: '잠시 후에 다시 시도해 주세요.',
                        confirmButtonColor: '#71d5c9',
                    }).then(() => {
                        loginHandler();
                    });
                case 'auth/invalid-email':
                    return Swal.fire({
                        icon: 'error',
                        title: '잘못된 이메일 형식입니다.',
                        text: '유효한 이메일 형식으로 작성해주세요.',
                        confirmButtonColor: '#71d5c9',
                    }).then(() => {
                        loginHandler();
                    });
                case 'auth/invalid-credential':
                    return Swal.fire({
                        icon: 'error',
                        title: '잘못된 정보를 입력하였습니다.',
                        text: '가입한 계정의 정보를 입력해주세요.',
                        confirmButtonColor: '#71d5c9',
                    }).then(() => {
                        loginHandler();
                    });
                default:
                    return Swal.fire({
                        icon: 'error',
                        title: '로그인에 실패하였습니다.',
                        text: '이메일 주소와 비밀번호를 확인해주세요.',
                        confirmButtonColor: '#71d5c9',
                    }).then(() => {
                        loginHandler();
                    });
            }
        }
    };

    // '여행하러가기' 버튼 클릭 시, 실행
    const askLoginButtonHandler = () => {
        Swal.fire({
            imageUrl: '/imgs/airplane.png',
            imageWidth: 256,
            imageHeight: 256,
            title: '로그인 후 이용이 가능합니다.',
            text: '로그인 하시겠습니까?',
            color: '#71d5c9',
            showCancelButton: true,
            confirmButtonText: '로그인',
            cancelButtonText: '취소',
            confirmButtonColor: '#71d5c9',
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
            imageUrl: '/imgs/airplane.png',
            imageWidth: 256,
            imageHeight: 256,
            title: "Let's Travel !",
            color: '#71d5c9',
            showDenyButton: true,
            confirmButtonText: '로그인',
            confirmButtonColor: '#71d5c9',
            denyButtonText: '회원가입',
            denyButtonColor: '#71d5c9',
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
                    '<label style="margin-right:15px">이메일</label>' +
                    '<input required id="email" type="email" class="swal2-input" placeholder="이메일을 입력해주세요."> <br/>' +
                    '<label>비밀번호</label>' +
                    '<input id="password" type="password" class="swal2-input" placeholder="비밀번호를 입력해주세요.">',
                focusConfirm: false,
                confirmButtonColor: '#71d5c9',
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
                    '<label style="padding:9px">이메일</label>' +
                    '<input id="email" type="email" class="swal2-input" placeholder="이메일을 입력하세요."> <br/>' +
                    '<label>비밀번호</label>' +
                    '<input id="password" type="password" class="swal2-input" placeholder="비밀번호를 입력하세요."> <br/>' +
                    '<label style="padding:18px">확인</label>' +
                    '<input id="passCheck" type="password" class="swal2-input" placeholder="비밀번호를 재입력하세요.">',
                focusConfirm: false,
                confirmButtonColor: '#71d5c9',
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
                            confirmButtonColor: '#71d5c9',
                            confirmButtonText: '회원가입 하러가기',
                        }).then(() => {
                            signupHandler();
                        });
                    } else {
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
    const successAlertHandler = async (formValues) => {
        // 로그인 성공 시, '로그인 성공!' alert
        if (formValues.length === 2) {
            await login(formValues);
            console.log('폼밸류', formValues);
            localStorage.setItem('userEmail', formValues[0]);
        }
        // 회원가입 성공 시, '회원가입 성공!' alert -> 로그인 Modal로 이동
        else {
            // firebase에 이메일, 비밀번호 저장
            await signUp(formValues);
        }
    };

    // 로그인, 회원가입 실패 시, alert
    const failAlertHandler = (formValues) => {
        // 로그인 실패 시, alert
        if (formValues.length === 2) {
            // 이메일, 비밀번호 둘 다 입력하지 않은 경우
            if (formValues[0] === '' && formValues[1] === '') {
                Swal.fire({
                    icon: 'warning',
                    title: '잘못된 정보를 입력하였습니다.',
                    text: '이메일 주소와 비밀번호를 다시 확인해주세요!',
                    confirmButtonColor: '#71d5c9',
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
                        confirmButtonColor: '#71d5c9',
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
                        confirmButtonColor: '#71d5c9',
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
                    confirmButtonColor: '#71d5c9',
                    confirmButtonText: '회원가입 하러가기',
                }).then(() => {
                    signupHandler();
                });
            }
        }
    };

    return (
        <>
            <StPage>
                <StContainer>
                    <StWrap>
                        <StH>여행하자!</StH>
                        <StBtn
                            onClick={() => {
                                if (auth.currentUser) {
                                    console.log(auth.currentUser);
                                    navigate('/survey');
                                } else {
                                    // '여행하러가기' 버튼 클릭 시, 로그인 여부 확인 Modal 실행
                                    askLoginButtonHandler();
                                }
                            }}
                        >
                            ✈️
                        </StBtn>
                    </StWrap>
                    <StH2>#Let'sTravel #여행지추천 #해외여행 #브이로그</StH2>
                </StContainer>
            </StPage>
        </>
    );
};
export default Home;

const StPage = styled.div`
    width: 100vw;
    height: 85vh;
    background-color: #f5f5f5;
`;

const StContainer = styled.div`
    height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const StWrap = styled.div`
    display: flex;
    gap: 20px;
`;
const StH2 = styled.h2`
    font-size: 15px;
    color: #71d5c9;
    font-family: SCDream5;
    margin: 15px 60px 0 0;
    word-spacing: 10px;
`;

const StH = styled.h1`
    font-size: 20px;
    font-family: SCDream5;
    width: 550px;
    height: 60px;
    padding: 20px 0 0 20px;
    background-color: white;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
    border: 1.2px solid #71d5c9;
    border-radius: 10px;
    color: #8f8f8f;
`;

const StBtn = styled.button`
    width: 65px;
    height: 65px;
    border: none;
    border-radius: 50px;
    background-color: #71d5c9;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.3);
    font-family: SCDream3;
    font-size: 18px;
    cursor: pointer;
    &:hover {
        transform: scale(1.1);
        transition: 0.2s;
    }
`;
