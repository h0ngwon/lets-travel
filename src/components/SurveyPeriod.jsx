import SurveyCircle from './ui/SurveyCircle';
import styled from 'styled-components';

function SurveyPeriod() {
    return (
        <div>
            <Title>Q. 선호하는 여행기간을 선택해주세요</Title>
            <CircleWrap>
                <SurveyCircle>3일</SurveyCircle>
                <SurveyCircle>15일</SurveyCircle>
                <SurveyCircle>30일</SurveyCircle>
            </CircleWrap>
        </div>
    );
}
const Title = styled.h1`
    font-size: 20px;
    margin: 40px auto 20px auto;
    text-align: center;
    color: #494949;
`;

const CircleWrap = styled.div`
    display: flex;
    justify-content: center;
    padding: 100px 200px;
    gap: 70px;
`;

export default SurveyPeriod;
