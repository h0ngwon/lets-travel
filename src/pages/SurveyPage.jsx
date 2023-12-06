import SurveyCountry from 'components/SurveyCountry';
import SurveyKeyword from 'components/SurveyKeyword';
import SurveyPeriod from 'components/SurveyPeriod';
import SurveyWith from 'components/SurveyWith';
import React, { useState } from 'react';

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
                return (
                    <SurveyCountry
                        nextPageHandler={nextPageHandler}
                        prevPageHandler={prevPageHandler}
                    />
                );
            case 2:
                return (
                    <SurveyWith
                        nextPageHandler={nextPageHandler}
                        prevPageHandler={prevPageHandler}
                    />
                );
            case 3:
                return (
                    <SurveyPeriod
                        nextPageHandler={nextPageHandler}
                        prevPageHandler={prevPageHandler}
                    />
                );
            case 4:
                return (
                    <SurveyKeyword
                        nextPageHandler={nextPageHandler}
                        prevPageHandler={prevPageHandler}
                    />
                );
            default:
                return null;
        }
    };
    return (
        <div>
            {renderSurveyPage()}
            {currentPage > 1}
            {currentPage < totalPage}
        </div>
    );
}

export default SurveyPage;
