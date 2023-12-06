import React from 'react';
import SurveyCircle from './ui/SurveyCircle';
import styled from 'styled-components';

function SurveyPeriod() {
    return (
        <div>
            <CircleWrap>
                <SurveyCircle>3일</SurveyCircle>
                <SurveyCircle>15일</SurveyCircle>
                <SurveyCircle>30일</SurveyCircle>
            </CircleWrap>
        </div>
    );
}

const CircleWrap = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(auto, 1fr));
    align-items: center;
    place-items: center;
    padding: 200px 200px;
    gap: 70px;
`;

export default SurveyPeriod;
