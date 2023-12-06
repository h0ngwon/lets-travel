import React from 'react';
import SurveyCircle from './ui/SurveyCircle';
import styled from 'styled-components';

function SurveyPeriod({ nextPageHandler, prevPageHandler }) {
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
    display: flex;
    justify-content: center;
    padding: 200px 200px;
    gap: 70px;
`;

export default SurveyPeriod;
