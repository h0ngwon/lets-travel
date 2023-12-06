import React from 'react';
import SurveyCircle from './ui/SurveyCircle';
import Navbar from './ui/Navbar';
import SurveyButton from './ui/SurveyButton';
import Footer from './ui/Footer';
import styled from 'styled-components';

function SurveyPeriod({ nextPageHandler }) {
    return (
        <div>
            <Navbar />
            <CircleWrap>
                <SurveyCircle>3일</SurveyCircle>
                <SurveyCircle>15일</SurveyCircle>
                <SurveyCircle>30일</SurveyCircle>
            </CircleWrap>
            <SurveyButton nextPageHandler={nextPageHandler}/>
            <Footer />
        </div>
    );
}

const CircleWrap = styled.div`
    display: flex;
    justify-content: center;
    padding-top: 200px;
    padding-bottom: 150px;
    gap: 70px;
`

export default SurveyPeriod;
