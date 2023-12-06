import React from 'react';
import SurveyCircle from './ui/SurveyCircle';
import { styled } from 'styled-components';

function SurveyWith() {
    return (
        <div>
            <CircleWrap>
                <SurveyCircle>혼자</SurveyCircle>
                <SurveyCircle>가족</SurveyCircle>
                <SurveyCircle>친구</SurveyCircle>
                <SurveyCircle>연인</SurveyCircle>
            </CircleWrap>
        </div>
    );
}

const CircleWrap = styled.div`
    display: grid;
    grid-template-columns: repeat(4, minmax(auto, 1fr));
    align-items: center;
    place-items: center;
    padding: 200px 200px;
    gap: 40px;
`;

export default SurveyWith;
