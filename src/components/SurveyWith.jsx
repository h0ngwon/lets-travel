import React from 'react';
import SurveyCircle from './ui/SurveyCircle';
import { styled } from 'styled-components';

function SurveyWith() {
    return (
        <div>
            <Title>Q. 함께 여행하고 싶은 사람을 선택해주세요</Title>
            <CircleWrap>
                <SurveyCircle>혼자</SurveyCircle>
                <SurveyCircle>가족</SurveyCircle>
                <SurveyCircle>친구</SurveyCircle>
                <SurveyCircle>연인</SurveyCircle>
            </CircleWrap>
        </div>
    );
}
const Title = styled.h1`
    font-size: 20px;
    margin: 40px auto 20px auto;
    text-align: center;
    color: #494949;
`;

const CircleWrap = styled.div`
    display: grid;
    grid-template-columns: repeat(4, minmax(auto, 1fr));
    align-items: center;
    place-items: center;
    padding: 100px 200px;
    gap: 40px;
`;

export default SurveyWith;
