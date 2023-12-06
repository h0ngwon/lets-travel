import React from 'react';
import SurveyCountry from 'components/SurveyCountry';
// import SurveyWith from 'components/SurveyWith';
import SurveyPeriod from 'components/SurveyPeriod';
import SurveyKeyword from 'components/SurveyKeyword';

function SurveyPage() {

    return (
        <div>
            <SurveyCountry />
            {/* <SurveyWith /> */}
            <SurveyPeriod />
            <SurveyKeyword />
        </div>
    );
}

export default SurveyPage;
