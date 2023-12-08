import React from 'react';
import styled from 'styled-components';

function SurveyCircle({ children, $isSelected }) {
    console.log('$isSelected', $isSelected);
    return (
        <SurveyCircleSt $isSelected={$isSelected}>{children}</SurveyCircleSt>
    );
}

const SurveyCircleSt = styled.button`
    width: 180px;
    height: 180px;
    background-color: ${({ $isSelected }) =>
        $isSelected ? '#71d5c9' : '#d5d5d5'};
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
`;

export default SurveyCircle;
