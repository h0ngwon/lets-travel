import React from 'react';
import SurveyCircle from './ui/SurveyCircle';
import styled from 'styled-components';

function SurveyKeyword() {
    return (
        <div>
            <Title>Q. 원하는 키워드를 선택해주세요(최대3개)</Title>
            <CircleWrap>
                <SurveyCircle>관광</SurveyCircle>
                <SurveyCircle>쇼핑</SurveyCircle>
                <SurveyCircle>액티비티</SurveyCircle>
                <SurveyCircle>힐링</SurveyCircle>
                <SurveyCircle>맛집</SurveyCircle>
                <SurveyCircle>이색체험</SurveyCircle>
                <SurveyCircle>가성비</SurveyCircle>
                <SurveyCircle>사진</SurveyCircle>
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
    padding: 20px 200px 60px 200px;
    gap: 30px;
    align-items: center;
    place-items: center;
`;

export default SurveyKeyword;
