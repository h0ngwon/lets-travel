import React, { useState } from 'react';
import SurveyCircle from './ui/SurveyCircle';
import { styled } from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { getCountryLists } from 'apis/testResult';
import { useNavigate } from 'react-router-dom';
import SurveyButton from './ui/SurveyButton';

// TODO: 선택하지 않고 다음버튼을 클릭하면 넘어갈 수 없도록
// TODO: 한번 선택 후 다른항목으로 변경시에 바뀐 항목의 타입으로 카운트
// TODO: 키워드 선택만 3개로 가능...?

function SurveyQnA() {
    const { isPending, isError, data } = useQuery({
        queryKey: ['countryLists'],
        queryFn: getCountryLists,
    });
    const [currentPage, setCurrentPage] = useState(0);
    const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);
    const [answers, setAnswers] = useState(new Array(4).fill(null));
    console.log('엔서', answers);
    const totalPage = data?.length || 0;
    const navigate = useNavigate();
    const [countryTypeList, setCountryTypeList] = useState([
        { country: 'A', count: 0 },
        { country: 'B', count: 0 },
        { country: 'C', count: 0 },
        { country: 'D', count: 0 },
        { country: 'E', count: 0 },
        { country: 'F', count: 0 },
        { country: 'G', count: 0 },
        { country: 'H', count: 0 },
    ]);
    if (isPending) {
        return <h2>🙇🏻‍♀️잠시만 기다려 주세요</h2>;
    }

    if (isError) {
        return <h2>🙅🏻‍♀️테스트 목록을 불러오지 못했습니다</h2>;
    }

    const nextPageHandler = () => {
        if (currentPage < totalPage) {
            setCurrentPage(currentPage + 1);
            setIsNextButtonDisabled(true);
        }
    };

    const prevPageHandler = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const progressPercentage = ((currentPage + 1) / totalPage) * 100;

    // 선택지 클릭하면 타입 카운트
    const answerCountHandler = (typeStr, index) => {
        // 타입들을 배열에서 콤마로 구분해줌
        console.log('선택', typeStr);
        console.log('현재페이지', currentPage);
        if (answers[currentPage] === null) {
            setAnswers((prev) => {
                const newAnswers = [...prev];
                newAnswers[currentPage] = index;
                return newAnswers;
            });
        } else {
        }
        console.log('answers', answers);
        const types = typeStr.split(',');
        let list = countryTypeList.map((item) => ({ ...item }));
        types.forEach((type) => {
            const selecAnswer = list.find((item) => item.country === type);
            if (selecAnswer) {
                selecAnswer.count += 1;
            }
        });
        setCountryTypeList(list);
        setIsNextButtonDisabled(!typeStr);
    };

    // 많이 선택된 타입 찾아주기
    const mostSelecTypeCount = () => {
        let setCount = 0;
        let mostSelecType = [];

        countryTypeList.forEach((item) => {
            if (item.count > setCount) {
                setCount = item.count;
                mostSelecType = [item.country];
            } else if (item.count === setCount) {
                mostSelecType.push(item.country);
            }
        });
        // count가 같으면 랜덤으로 추출
        // TODO: count가 잘못되고있음....질문은 적고 겹치는 유형이 많아서 발생하는 문제같음
        const randomCountry =
            mostSelecType[Math.floor(Math.random() * mostSelecType.length)];
        console.log('랜덤추출', randomCountry);
        return randomCountry;
    };
    if (data === undefined) {
        return null;
    }
    const currentSurvey = data[currentPage];

    return (
        <Container>
            {currentPage < totalPage ? (
                <>
                    <div style={{ position: 'relative' }}>
                        <ProgressBarWrap>
                            <ProgressBarMove
                                style={{
                                    width: `${progressPercentage}%`,
                                }}
                            />
                        </ProgressBarWrap>
                    </div>
                    <div>
                        {currentSurvey.q.map((qvalue, qindex) => {
                            return (
                                <div key={qindex}>
                                    <Title>{qvalue}</Title>
                                </div>
                            );
                        })}
                        <CircleWrap>
                            {currentSurvey.a.map((avalue, aindex) => {
                                return (
                                    <div
                                        key={aindex}
                                        onClick={() => {
                                            answerCountHandler(
                                                avalue.type,
                                                aindex,
                                            );
                                        }}
                                    >
                                        <SurveyCircle
                                            $isSelected={
                                                answers[currentPage] === aindex
                                            }
                                        >
                                            {avalue.text}
                                        </SurveyCircle>
                                    </div>
                                );
                            })}
                        </CircleWrap>
                    </div>
                    <SurveyButton
                        nextPageHandler={nextPageHandler}
                        prevPageHandler={prevPageHandler}
                        disabled={isNextButtonDisabled}
                    />
                </>
            ) : (
                <EndTestContainer>
                    <EndComment>🍭 테스트가 끝났습니다 🍭</EndComment>
                    <ResultButton onClick={() => navigate('/')}>
                        다시하기
                    </ResultButton>
                    <ResultButton
                        onClick={() => {
                            const select = mostSelecTypeCount();
                            navigate(`/result/${select}`);
                        }}
                    >
                        결과보러가기
                    </ResultButton>
                </EndTestContainer>
            )}
        </Container>
    );
}
const Container = styled.div`
    width: 100vw;
    height: 80vh;
`;
const ProgressBarWrap = styled.div`
    width: 60%;
    height: 20px;
    background-color: #d5d5d5;
    margin: 50px auto 0 auto;
`;

const ProgressBarMove = styled.div`
    height: 100%;
    background-color: #71d5c9;
`;

const Title = styled.h1`
    font-size: 20px;
    margin: 40px auto 20px auto;
    text-align: center;
    color: #494949;
`;

const CircleWrap = styled.div`
    display: flex;
    justify-content: center;
    padding: 100px 200px;
    gap: 50px;
`;

const ResultButton = styled.button`
    width: 200px;
    height: 60px;
    border-radius: 50px;
    background-color: white;
    font-size: 16px;
    border: 1px solid #71d5c9;
    margin: 20px 0;
    color: #71d5c9;
    cursor: pointer;
    &:hover {
        background-color: #71d5c9;
        color: white;
    }
`;

const EndTestContainer = styled.div`
    width: 100vw;
    height: 800px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
`;

const EndComment = styled.h1`
    font-size: 30px;
    margin-bottom: 80px;
`;
export default SurveyQnA;
