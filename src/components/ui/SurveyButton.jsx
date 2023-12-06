import React from 'react';
import { styled } from 'styled-components';

function SurveyButton({ nextPageHandler, prevPageHandler }) {
    return (
        <div>
            <ButtonContainer>
                <ButtonWrap>
                    <Button onClick={prevPageHandler}>이전페이지</Button>
                    <Button onClick={nextPageHandler}>다음페이지</Button>
                </ButtonWrap>
            </ButtonContainer>
        </div>
    );
}

const ButtonContainer = styled.div`
    width: 100vw;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    bottom: 80px;
    position: absolute;
`;

const ButtonWrap = styled.div`
    width: 50vw;
    height: 100px;
    display: flex;
    justify-content: center;
    gap: 100px;
`;
const Button = styled.button`
    width: 130px;
    height: 60px;
    border-radius: 50px;
    border-style: none;
    background-color: #71d5c9;
    color: white;
    &:hover {
        background-color: white;
        border: 1px solid #71d5c9;
        color: #71d5c9;
    }
`;

export default SurveyButton;
