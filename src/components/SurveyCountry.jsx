import React from 'react';
import SurveyButton from './ui/SurveyButton';
import SurveyCircle from './ui/SurveyCircle';
import Navbar from './ui/Navbar';
import { styled } from 'styled-components';
import Footer from './ui/Footer';

function SurveyCountry() {
    return (
        <CountryContainer>
            <Navbar />
            <CircleWrap>
                <SurveyCircle>아시아</SurveyCircle>
                <SurveyCircle>아프리카</SurveyCircle>
                <SurveyCircle>동남아</SurveyCircle>
                <SurveyCircle>호주</SurveyCircle>
                <SurveyCircle>유럽</SurveyCircle>
                <SurveyCircle>아메리카</SurveyCircle>
            </CircleWrap>
            <SurveyButton />
            <Footer />
        </CountryContainer>
    );
}

const CountryContainer = styled.div`
    width: 100vw;
    height: 100vh;
`;

const CircleWrap = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(auto, 1fr));
    align-items: center;
    place-items: center;
    margin: 100px 200px;
    gap: 50px;
`;
export default SurveyCountry;
