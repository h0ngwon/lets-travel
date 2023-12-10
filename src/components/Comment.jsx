import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addData, deleteData, fetchData, updateData } from 'apis/comments';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Swal from 'sweetalert2';
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

    //firebase에서 데이터를 가져와 react 애플리캐이션을 업데이트 함
    const queryClient = useQueryClient();

    const { data, isLoading, isSuccess, isError, error } = useQuery({
        queryKey: ['comments'],
        queryFn: fetchData,
        staleTime: 1000,
    });

    let selectCountry = data?.filter((value) => {
        return value.country === activeCountry;
    });

    if (activeCountry === '') {
        selectCountry = data;
    }

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
            <CountryBtn countries={countries} />
            <StCommentSection>
                {selectCountry?.length !== 0 ? (
                    selectCountry?.map((comment) => {
                        const isAuthor = comment.userEmail === userEmail;
                        return (
                            <StComment key={comment.key}>
                                <StCommentEmailnDate>
                                    <StCommentLeftSec>
                                        <p>{comment.userEmail}</p>
                                        <StCommentEditnDel>
                                            <StCommentEditBtn
                                                $shouldDisplay={isAuthor}
                                                onClick={() =>
                                                    editBtnHndlr(
                                                        comment.id,
                                                        comment.contents,
                                                    )
                                                }
                                            >
                                                수정 |
                                            </StCommentEditBtn>
                                            <StCommentDelBtn
                                                $shouldDisplay={isAuthor}
                                                onClick={() => {
                                                    deleteMutate.mutate(
                                                        comment.id,
                                                    );
                                                }}
                                            >
                                                삭제
                                            </StCommentDelBtn>
                                        </StCommentEditnDel>
                                    </StCommentLeftSec>
                                    <p>
                                        {new Intl.DateTimeFormat('ko-KR', {
                                            dateStyle: 'full',
                                            timeStyle: 'short',
                                        }).format(comment.createdAt)}
                                    </p>
                                </StCommentEmailnDate>
                                <StCommentP>{comment.contents}</StCommentP>
                            </StComment>
                        );
                    })
                ) : (
                    <h2>등록된 댓글이 없습니다</h2>
                )}
            </StCommentSection>
        </StCommentPageDiv>
    );
}

const StCommentPageDiv = styled.div`
    width: 80%;
    height: 100%;
    min-height: 100vh;
    padding: 50px;
    text-align: center;
    margin: 0 auto;
`;
const StCommentSection = styled.div`
    border: 1px solid #71d5c9;
    margin-top: 50px;
    margin-bottom: 50px;
    padding: 50px;
`;
const StCommentInputForm = styled.form`
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 40px;
    padding-bottom: 40px;
    border-bottom: 1px solid #71d5c9;
`;
const StSelectCountry = styled.select`
    padding: 12px 40px;
    border-radius: 8px;
    border-style: none;
    background-color: #71d5c9;
    color: white;
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
    background-color: #71d5c9;
    color: white;
    &:hover {
        background-color: #efefef;
        color: black;
    }
`;

const StComment = styled.div`
    width: 80%;
    margin: 0 auto 20px auto;
    background-color: #efefef;
    padding: 15px;
    padding-left: 30px;
    padding-right: 30px;
    border-radius: 20px;
`;
const StCommentEmailnDate = styled.div`
    width: 97%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: darkgray;
    margin-bottom: 20px;
    padding-top: 8px;
`;
const StCommentLeftSec = styled.div`
    display: flex;
`;
const StCommentEditnDel = styled.div`
    display: flex;
`;
const StCommentDelBtn = styled.button`
    border-style: none;
    color: #8186ff;
    background-color: none;
    cursor: pointer;
    display: ${(props) => (props.$shouldDisplay ? 'flex' : 'none')};
`;
const StCommentEditBtn = styled.button`
    border-style: none;
    color: #8186ff;
    background-color: none;
    margin-left: 20px;
    cursor: pointer;
    word-spacing: 10px;
    display: ${(props) => (props.$shouldDisplay ? 'flex' : 'none')};
`;
const StCommentP = styled.p`
    color: black;
    text-align: left;
    line-height: 25px;
    font-family: SCDream3;
`;

export default Comments;
