import React, { useState, useEffect } from 'react';
import { db } from 'firebaseConfig';
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    query,
    updateDoc,
} from 'firebase/firestore';
import { nanoid } from 'nanoid';
import CountryBtn from './ui/CountryBtn';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { auth } from 'config/firebaseConfig';
import { useQuery, useQueryClient } from '@tanstack/react-query';

function Comments() {
    const [selectedCountry, setSelectedCountry] = useState('일본'); //select의 country 목록
    const activeCountry = useSelector((state) => state.countrySlice); //countryBtn 클릭시 각 나라의 state를 보여줌
    const dispatch = useDispatch();
    const [contents, setContents] = useState('');
    const [comments, setComments] = useState([]);
    console.log(comments);
    const countries = [
        '일본',
        '베트남',
        '호주',
        '미국',
        '캐나다',
        '프랑스',
        '영국',
        '이집트',
    ];

    const userEmail = localStorage.getItem('userEmail');
    console.log(userEmail);

    //firebase에서 데이터를 가져와 react 애플리캐이션을 업데이트 함
    const fetchData = async () => {
        const q = query(collection(db, 'comments'));
        const querySnapshot = await getDocs(q);

        const initialComments = [];

        querySnapshot.forEach((doc) => {
            initialComments.push({ id: doc.id, ...doc.data() });
        });
        setComments(initialComments);
    };

    const handleCountryChange = (e) => {
        setSelectedCountry(e.target.value);
    };

    const onChangeHandler = (e) => {
        setContents(e.target.value.trimStart());
    };

    const deleteBtnHandler = async (id) => {
        await deleteDoc(doc(db, 'comments', id));
        await fetchData();
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const docRef = collection(db, 'comments');
        const newComment = {
            contents,
            country: selectedCountry,
            createdAt: new Date().toLocaleString(),
            key: nanoid(),
            userEmail: userEmail, //auth 완성 후, 처리해야함
        };
        await addDoc(docRef, newComment);
        fetchData();
        setContents('');
    };

    //처음 컴포넌트가 렌더링 되면 서버에서 데이터를 받아와 state에 저장
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <StCommentPageDiv>
            <CountryBtn countries={countries} />

            <StCommentSection>
                <StCommentInputForm onSubmit={onSubmit}>
                    <StSelectCountry
                        onChange={handleCountryChange}
                        value={selectedCountry}
                    >
                        {countries.map((country, index) => (
                            <option key={index} value={country}>
                                {country}
                            </option>
                        ))}
                    </StSelectCountry>

                    <StInput
                        type='text'
                        placeholder='댓글을 입력하세요'
                        onChange={onChangeHandler}
                        value={contents}
                        required
                    />
                    <StSubmitBtn>등록</StSubmitBtn>
                </StCommentInputForm>

                <br />
                <br />
                {comments
                    .filter((value) => {
                        return value.country === activeCountry;
                    })
                    .map((comment) => {
                        console.log(comment);
                        return (
                            <StComment key={comment.key}>
                                <StCommentEmailnDate>
                                    <p>{comment.userEmail}</p>
                                    <p>{comment.createdAt}</p>
                                </StCommentEmailnDate>
                                <StCommentTxtnBtn>
                                    <p>{comment.contents}</p>
                                    <div>
                                        <button
                                            onClick={() => {
                                                deleteBtnHandler(comment.id);
                                            }}
                                        >
                                            삭제
                                        </button>
                                        <button>수정</button>
                                    </div>
                                </StCommentTxtnBtn>
                            </StComment>
                        );
                    })}
            </StCommentSection>
        </StCommentPageDiv>
    );
}

const StCommentPageDiv = styled.div`
    width: 80%;
    padding: 50px;
    text-align: center;
    margin: 0 auto;
`;
const StCommentSection = styled.div`
    border: 1px solid #71d5c9;
    margin-top: 100px;
    margin-bottom: 50px;
    padding: 50px;
`;
const StCommentInputForm = styled.form`
    display: flex;
    justify-content: center;
    gap: 20px;
`;
const StSelectCountry = styled.select`
    padding: 12px 40px;
    border-radius: 8px;
    border-style: none;
    background-color: #efefef;
    cursor: pointer;
`;
const StInput = styled.input`
    border-radius: 8px;
    border-style: none;
    border: 1px solid #71d5c9;
    padding: 12px 180px;
`;
const StSubmitBtn = styled.button`
    border-style: none;
    border-radius: 8px;
    padding: 12px 40px;
    cursor: pointer;

    &:hover {
        background-color: #71d5c9;
        color: white;
    }
`;
const StComment = styled.div`
    width: 80%;
    margin: 0 auto 20px auto;
    background-color: #efefef;
    padding: 15px;
    padding-left: 30px;
    border-radius: 20px;
`;
const StCommentEmailnDate = styled.div`
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: darkgray;
`;
const StCommentTxtnBtn = styled.div`
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export default Comments;
