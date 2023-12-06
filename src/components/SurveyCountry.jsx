import React from 'react';
import SurveyButton from './ui/SurveyButton';
import SurveyCircle from './ui/SurveyCircle';
import { styled } from 'styled-components';

function SurveyCountry({ nextPageHandler }) {
    return (
        <div>
            <CircleWrap>
                <SurveyCircle>아시아</SurveyCircle>
                <SurveyCircle>아프리카</SurveyCircle>
                <SurveyCircle>동남아</SurveyCircle>
                <SurveyCircle>호주</SurveyCircle>
                <SurveyCircle>유럽</SurveyCircle>
                <SurveyCircle>아메리카</SurveyCircle>
            </CircleWrap>
            <SurveyButton nextPageHandler={nextPageHandler} />
        </div>
    );
}

const CircleWrap = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(auto, 1fr));
    align-items: center;
    place-items: center;
    margin: 100px 200px;
    gap: 50px;
`;
export default SurveyCountry;
