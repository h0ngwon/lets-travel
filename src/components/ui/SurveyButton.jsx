import { styled } from 'styled-components';

function SurveyButton({ nextPageHandler, prevPageHandler, disabled }) {
    return (
        <div>
            <ButtonContainer>
                <ButtonWrap>
                    <Button onClick={prevPageHandler}>이전페이지</Button>
                    <Button onClick={nextPageHandler} disabled={disabled}>
                        다음페이지
                    </Button>
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
    background-color: ${({ disabled }) => (disabled ? '#d5d5d5' : 'white')};
    border: ${({ disabled }) =>
        disabled ? '1px solid#d5d5d5' : '1px solid #71d5c9'};
    color: ${({ disabled }) => (disabled ? 'white' : '#71d5c9')};
    cursor: pointer;
    &:hover {
        background-color: ${({ disabled }) =>
            disabled ? '#d5d5d5' : '#71d5c9'};
        color: white;
    }
`;

export default SurveyButton;
