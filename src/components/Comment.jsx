import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteData, fetchData } from 'apis/comments';
import { addDoc, collection } from 'firebase/firestore';
import { db } from 'firebaseConfig';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import CountryBtn from './ui/CountryBtn';

function Comments() {
    const [selectedCountry, setSelectedCountry] = useState('일본'); //select의 country 목록
    const activeCountry = useSelector((state) => state.countrySlice); //countryBtn 클릭시 각 나라의 state를 보여줌
    const [contents, setContents] = useState('');

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
    const queryClient = useQueryClient();
    queryClient.invalidateQueries({ queryKey: ['comments'] });

    const { data, isLoading, isSuccess, isError, error } = useQuery({
        queryKey: ['comments'],
        queryFn: fetchData,
        staleTime: 1000,
    });

    const deleteMutate = useMutation({
        mutationKey: ['comments'],
        mutationFn: deleteData,
    });

    const handleCountryChange = (e) => {
        setSelectedCountry(e.target.value);
    };

    const onChangeHandler = (e) => {
        setContents(e.target.value.trimStart());
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
        setContents('');
    };

    //처음 컴포넌트가 렌더링 되면 서버에서 데이터를 받아와 state에 저장
    useEffect(() => {}, []);

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
                {data
                    ?.filter((value) => {
                        return value.country === activeCountry;
                    })
                    .map((comment) => {
                        return (
                            <StComment key={comment.key}>
                                <StCommentEmailnDate>
                                    <p>{comment.userEmail}</p>
                                    <StCommentP>{comment.contents}</StCommentP>
                                    <StCommentDatenBtn>
                                        <p>{comment.createdAt}</p>
                                        <StCommentDelBtn
                                            onClick={() => {
                                                deleteMutate.mutate(comment.id);
                                            }}
                                        >
                                            ✕
                                        </StCommentDelBtn>
                                    </StCommentDatenBtn>
                                </StCommentEmailnDate>
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
    width: 97%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: darkgray;
    gap: 15px;
`;
const StCommentDatenBtn = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const StCommentDelBtn = styled.button`
    border-style: none;
    color: darkgray;
    background-color: none;
    margin-left: 20px;
    cursor: pointer;
`;
const StCommentP = styled.p`
    color: black;
`;

export default Comments;
