import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteData, fetchData, updateData, addData } from 'apis/comments';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import CountryBtn from './ui/CountryBtn';
import Swal from 'sweetalert2';

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

    //firebase에서 데이터를 가져와 react 애플리캐이션을 업데이트 함
    const queryClient = useQueryClient();

    const { data, isLoading, isSuccess, isError, error } = useQuery({
        queryKey: ['comments'],
        queryFn: fetchData,
        staleTime: 1000,
    });

    const deleteMutate = useMutation({
        mutationKey: ['comments'],
        mutationFn: deleteData,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['comments'] });
        },
    });
    const updateMutate = useMutation({
        mutationFn: updateData,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['comments'] });
        },
    });
    const addMutate = useMutation({
        mutationFn: addData,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['comments'] });
        },
    });

    const handleCountryChange = (e) => {
        setSelectedCountry(e.target.value);
    };

    const onChangeHandler = (e) => {
        setContents(e.target.value.trimStart());
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const newComment = {
            contents,
            country: selectedCountry,
            createdAt: Date.now(),
            key: nanoid(),
            userEmail: userEmail,
        };
        addMutate.mutate(newComment);
        setContents('');
    };

    const editBtnHndlr = (id, currentText) => {
        Swal.fire({
            title: '댓글을 수정하세요',
            input: 'text',
            inputValue: currentText,
            showCancelButton: true,
            confirmButtonText: '수정 확인',
            confirmButtonColor: '#00a08d',
            cancelButtonText: '취소',
        }).then((result) => {
            const editText = result.value;
            if (result.isConfirmed) {
                updateMutate.mutate({ id, editText });
            }
        });
    };

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
                        const isAuthor = comment.userEmail === userEmail;

                        return (
                            <StComment key={comment.key}>
                                <StCommentEmailnDate>
                                    <p>{comment.userEmail}</p>
                                    <StCommentP>{comment.contents}</StCommentP>
                                    <StCommentDatenBtn>
                                        <p>
                                            {new Intl.DateTimeFormat('ko-KR', {
                                                dateStyle: 'full',
                                                timeStyle: 'short',
                                            }).format(comment.createdAt)}
                                        </p>
                                        <StCommentEditBtn
                                            $shouldDisplay={isAuthor}
                                            onClick={() =>
                                                editBtnHndlr(
                                                    comment.id,
                                                    comment.contents,
                                                )
                                            }
                                        >
                                            Edit
                                        </StCommentEditBtn>
                                        <StCommentDelBtn
                                            $shouldDisplay={isAuthor}
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
    height: 100%;
    min-height: 100vh;
    padding: 3.125rem;
    text-align: center;
    margin: 0 auto;
`;
const StCommentSection = styled.div`
    border: 0.0625rem solid #71d5c9;
    margin-top: 6.25rem;
    margin-bottom: 3.125rem;
    padding: 3.125rem;
`;
const StCommentInputForm = styled.form`
    display: flex;
    justify-content: center;
    gap: 1.25rem;
`;
const StSelectCountry = styled.select`
    padding: 0.75rem 2.5rem;
    border-radius: 0.5rem;
    border-style: none;
    background-color: #efefef;
    cursor: pointer;
`;
const StInput = styled.input`
    border-radius: 0.5rem;
    border-style: none;
    border: 0.0625rem solid #71d5c9;
    padding: 0.75rem 11.25rem;
`;
const StSubmitBtn = styled.button`
    border-style: none;
    border-radius: 0.5rem;
    padding: 0.75rem 2.5rem;
    cursor: pointer;
    &:hover {
        background-color: #71d5c9;
        color: white;
    }
`;
const StComment = styled.div`
    width: 80%;
    margin: 0 auto 1.25rem auto;
    background-color: #efefef;
    padding: 0.9375rem;
    padding-left: 1.875rem;
    border-radius: 1.25rem;
`;
const StCommentEmailnDate = styled.div`
    width: 97%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: darkgray;
    gap: 0.9375rem;
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
    margin-left: 1.25rem;
    cursor: pointer;
    display: ${(props) => (props.$shouldDisplay ? 'flex' : 'none')};
`;
const StCommentEditBtn = styled.button`
    border-style: none;
    color: darkgray;
    background-color: none;
    margin-left: 1.25rem;
    cursor: pointer;
    display: ${(props) => (props.$shouldDisplay ? 'flex' : 'none')};
`;
const StCommentP = styled.p`
    color: black;
    font-family: SCDream3;
`;

export default Comments;
