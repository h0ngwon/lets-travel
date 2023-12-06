import React from 'react';
import SurveyButton from './ui/SurveyButton';
import SurveyCircle from './ui/SurveyCircle';
import { styled } from 'styled-components';

function SurveyWith({ nextPageHandler, prevPageHandler }) {
    return (
        <div>
            <CircleWrap>
                <SurveyCircle>혼자</SurveyCircle>
                <SurveyCircle>가족</SurveyCircle>
                <SurveyCircle>친구</SurveyCircle>
                <SurveyCircle>연인</SurveyCircle>
            </CircleWrap>
            <SurveyButton
                nextPageHandler={nextPageHandler}
                prevPageHandler={prevPageHandler}
            />
        </div>
    );
}

const CircleWrap = styled.div`
    display: flex;
    justify-content: center;
    /* grid-template-columns: repeat(3, minmax(auto, 1fr)); */
    align-items: center;
    /* place-items: center; */
    margin: 200px 100px;
    gap: 50px;
`;

export default SurveyWith;
