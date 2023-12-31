import { useQuery } from '@tanstack/react-query';
import { getCountryLists } from 'apis/testResult';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import SurveyButton from './ui/SurveyButton';
import SurveyCircle from './ui/SurveyCircle';
import Loading from './ui/Loading';

const SurveyQnA = () => {
    const { isLoading, isError, data } = useQuery({
        queryKey: ['countryLists'],
        queryFn: getCountryLists,
    });
    const [currentPage, setCurrentPage] = useState(0);
    const [answers, setAnswers] = useState(new Array(4).fill(null));
    const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);
    const totalPage = data?.length || 0;
    const navigate = useNavigate();

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <h2>🙅🏻‍♀️테스트 목록을 불러오지 못했습니다</h2>;
    }

    const nextPageHandler = () => {
        if (currentPage < totalPage) {
            setCurrentPage(currentPage + 1);
            setIsNextButtonDisabled(answers[currentPage + 1] === null);
        }
    };

    const prevPageHandler = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
            setIsNextButtonDisabled(answers[currentPage - 1] === null);
        }
    };

    const progressPercentage = ((currentPage + 1) / totalPage) * 100;

    // 선택지 클릭버튼
    const answerCountHandler = (typeStr, index) => {
        setAnswers((prev) => {
            const newAnswers = [...prev];
            newAnswers[currentPage] = typeStr;
            return newAnswers;
        });
        setIsNextButtonDisabled(false);
    };

    // 많이 선택된 타입 찾아서 결과보기
    const mostSelecTypeCount = () => {
        const arrays = answers.map((a) => a.split(',')).flat();
        const counterMap = {};
        arrays.forEach((type) => {
            counterMap[type] = (counterMap[type] || 0) + 1;
        });
        const typeValues = Object.keys(counterMap);
        const maxValue = Math.max(...Object.values(counterMap));
        const maxIndex = Object.values(counterMap).indexOf(maxValue);
        const maxType = typeValues[maxIndex];
        // 가장 많이 나온 타입 중 첫번째값이 나옴!
        return maxType;
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
                                                answers[currentPage] ===
                                                avalue.type
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
};
const Container = styled.div`
    width: 100vw;
    height: 85vh;
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
    font-family: SCDream5;
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
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
`;

const EndComment = styled.h1`
    font-size: 28px;
    margin-bottom: 80px;
    font-family: SCDream5;
`;
export default SurveyQnA;
