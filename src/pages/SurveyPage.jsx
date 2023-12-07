import SurveyCountry from 'components/SurveyCountry';
import SurveyKeyword from 'components/SurveyKeyword';
import SurveyPeriod from 'components/SurveyPeriod';
import SurveyWith from 'components/SurveyWith';
import Footer from 'components/ui/Footer';
import Navbar from 'components/ui/Navbar';
import SurveyButton from 'components/ui/SurveyButton';
import React, { useState } from 'react';
import styled from 'styled-components';

function SurveyPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPage = 4;

    const nextPageHandler = () => {
        if (currentPage < totalPage) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPageHandler = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const renderSurveyPage = () => {
        switch (currentPage) {
            case 1:
                return <SurveyCountry />;
            case 2:
                return <SurveyWith />;
            case 3:
                return <SurveyPeriod />;
            case 4:
                return <SurveyKeyword />;
            default:
                return null;
        }
    };
    const progressPercentage = (currentPage / totalPage) * 100;

    return (
        <div>
            <Navbar />
            <div style={{ position: 'relative' }}>
                <ProgressBarWrap>
                    <ProgressBarMove
                        style={{
                            width: `${progressPercentage}%`,
                        }}
                    />
                </ProgressBarWrap>
            </div>
            {renderSurveyPage()}
            <SurveyButton
                nextPageHandler={nextPageHandler}
                prevPageHandler={prevPageHandler}
            />
            <Footer />
        </div>
    );
}

const ProgressBarWrap = styled.div`
    width: 80%;
    height: 20px;
    background-color: #d5d5d5;
    margin: 50px auto 0 auto;
`;

const ProgressBarMove = styled.div`
    height: 100%;
    background-color: #71d5c9;
`;
export default SurveyPage;
