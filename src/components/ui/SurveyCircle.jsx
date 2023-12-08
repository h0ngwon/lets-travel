import React from 'react';
import styled from 'styled-components';

function SurveyCircle({ children }) {
    return <SurveyCircleSt>{children}</SurveyCircleSt>;
}

const SurveyCircleSt = styled.button`
    width: 180px;
    height: 180px;
    background-color: #d5d5d5;
    border-style: none;
    border-radius: 90px;
    display: flex;
    justify-content: center;
    font-size: 20px;
    align-items: center;
    color: white;
    cursor: pointer;
    &:hover {
        background-color: #71d5c9;
    }
    &:focus {
        background-color: #71d5c9;
    }
`;

export default SurveyCircle;
