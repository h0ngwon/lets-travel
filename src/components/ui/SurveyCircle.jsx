import React from 'react';
import styled from 'styled-components';

function SurveyCircle({ children }) {
    return <SurveyCircleSt>{children}</SurveyCircleSt>;
}

const SurveyCircleSt = styled.div`
    width: 180px;
    height: 180px;
    background-color: #71d5c9;
    border-radius: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
`;

export default SurveyCircle;
