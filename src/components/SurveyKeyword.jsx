import React from 'react';
import SurveyCircle from './ui/SurveyCircle';
import Navbar from './ui/Navbar';
import Footer from './ui/Footer';
import SurveyButton from './ui/SurveyButton';
import styled from 'styled-components';

function SurveyKeyword({ nextPageHandler }) {
    return (
        <div>
            <Navbar />
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
            <SurveyButton nextPageHandler={nextPageHandler}/>
            <Footer />
        </div>
    );
}

const CircleWrap = styled.div`
    display: grid;
    grid-template-columns: repeat(4, minmax(auto, 1fr));
    padding-top: 150px;
    padding-bottom: 100px;
    gap: 50px;
    margin: 100px 100px;
    align-items: center;
    place-items: center;
`

export default SurveyKeyword;
