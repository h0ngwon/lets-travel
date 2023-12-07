import React from 'react';
import SurveyCircle from './ui/SurveyCircle';
import { styled } from 'styled-components';

function SurveyCountry() {
    return (
        <div>
            <Title>Q. 여행하고 싶은 대륙을 선택해주세요</Title>
            <CircleWrap>
                <SurveyCircle>아시아</SurveyCircle>
                <SurveyCircle>아프리카</SurveyCircle>
                <SurveyCircle>오세아니아</SurveyCircle>
                <SurveyCircle>유럽</SurveyCircle>
                <SurveyCircle></SurveyCircle>
                <SurveyCircle>아메리카</SurveyCircle>
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
    grid-template-columns: repeat(3, minmax(auto, 1fr));
    align-items: center;
    place-items: center;
    padding: 20px 200px 60px 200px;
    gap: 30px;
`;
export default SurveyCountry;
