import React from 'react';
import Navbar from './ui/Navbar';
import Footer from './ui/Footer';
import { styled } from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import {
    getCountryTypeData,
    getJapanLists,
    getVietnamLists,
    getCanadaLists,
    getEnglandLists,
    getFranceLists,
    getAustrailaLists,
    getEgyptLists,
} from 'apis/testResult';

function SurveyResult() {
    const { isPending, isError, data } = useQuery({
        queryKey: ['countryTypeData'],
        queryFn: getCountryTypeData,
    });

    const {
        isPending: japanListsPending,
        isError: japanListsError,
        data: japanListsdata,
    } = useQuery({
        queryKey: ['japanLists'],
        queryFn: getJapanLists,
    });

    const {
        isPending: vietnamListsPending,
        isError: vietnamListsError,
        data: vietnamListsdata,
    } = useQuery({
        queryKey: ['vietnamLists'],
        queryFn: getVietnamLists,
    });

    const {
        isPending: canadaListsPending,
        isError: canadaListsError,
        data: canadaListsdata,
    } = useQuery({
        queryKey: ['canadaLists'],
        queryFn: getCanadaLists,
    });

    const {
        isPending: englandListsPending,
        isError: englandListsError,
        data: englandListsdata,
    } = useQuery({
        queryKey: ['englandLists'],
        queryFn: getEnglandLists,
    });

    const {
        isPending: franceListsPending,
        isError: franceListsError,
        data: franceListsdata,
    } = useQuery({
        queryKey: ['franceLists'],
        queryFn: getFranceLists,
    });

    const {
        isPending: austrailaListsPending,
        isError: austrailaListsError,
        data: austrailaListsdata,
    } = useQuery({
        queryKey: ['austrailaLists'],
        queryFn: getAustrailaLists,
    });

    const {
        isPending: egyptListsPending,
        isError: egyptListsError,
        data: egyptListsdata,
    } = useQuery({
        queryKey: ['egyptLists'],
        queryFn: getEgyptLists,
    });

    if (
        isPending ||
        japanListsPending ||
        vietnamListsPending ||
        canadaListsPending ||
        englandListsPending ||
        franceListsPending ||
        austrailaListsPending ||
        egyptListsPending
    ) {
        return <h2>🙇🏻‍♀️잠시만 기다려 주세요</h2>;
    }

    if (
        isError ||
        japanListsError ||
        vietnamListsError ||
        canadaListsError ||
        englandListsError ||
        franceListsError ||
        austrailaListsError ||
        egyptListsError
    ) {
        return <h2>🙅🏻‍♀️결과를 불러오지 못했습니다</h2>;
    }

    return (
        <div>
            <Navbar />
            <Container>
                <ResultTextWrap>
                    {/* <MainComments> */}
                    <h3>당신의 추천 여행지는 한국입니다</h3>
                    <h1>"한국"</h1>
                    {/* </MainComments> */}
                </ResultTextWrap>
                <MapWrap>지도</MapWrap>
            </Container>
            <CountryWrap>
                <Country>도시1(이미지)</Country>
                <Country>도시2(이미지)</Country>
                <Country>도시3(이미지)</Country>
                <CommentsButton>댓글 남기러 가기</CommentsButton>
            </CountryWrap>
            <Footer />
        </div>
    );
}

const Container = styled.div`
    height: 400px;
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 100px;
`;

const ResultTextWrap = styled.div`
    width: 500px;
    height: 300px;
    text-align: center;
    line-height: 30px;
    flex-direction: column;
    margin: 0;
`;

const MapWrap = styled.div`
    width: 500px;
    height: 300px;
    margin: auto 50px auto 0;
    background-color: gray;
`;

const CountryWrap = styled.div`
    width: 100vw;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 50px 0;
`;

const Country = styled.div`
    width: 250px;
    height: 250px;
    margin: 0 60px;
    background-color: gray;
`;

const CommentsButton = styled.button`
    width: 130px;
    height: 60px;
    border-radius: 50px;
    background-color: white;
    margin-top: 180px;
    border: 1px solid #71d5c9;
    color: #71d5c9;
    &:hover {
        background-color: #71d5c9;
        color: white;
    }
`;
export default SurveyResult;
