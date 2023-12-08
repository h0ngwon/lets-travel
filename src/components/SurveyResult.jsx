import React, { useEffect, useState } from 'react';
import Navbar from './ui/Navbar';
import Footer from './ui/Footer';
import { styled } from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { getCountryTypeData } from 'apis/testResult';
import {
    getJapanLists,
    getVietnamLists,
    getUsaLists,
    getCanadaLists,
    getEnglandLists,
    getFranceLists,
    getAustrailaLists,
    getEgyptLists,
} from 'apis/cityResult';
import { useParams } from 'react-router-dom';

function SurveyResult() {
    const [resultType, setResultType] = useState([]);
    const { id } = useParams();

    const {
        isPending: countryTypeDataPending,
        isError: countryTypeDataError,
        data: countryTypeData,
    } = useQuery({
        queryKey: ['countryTypeData'],
        queryFn: getCountryTypeData,
    });
    const {
        isPending: japanListsPending,
        isError: japanListsError,
        data: japanListsData,
    } = useQuery({
        queryKey: ['japanLists'],
        queryFn: getJapanLists,
    });

    const {
        isPending: vietnamListsPending,
        isError: vietnamListsError,
        data: vietnamListsData,
    } = useQuery({
        queryKey: ['vietnamLists'],
        queryFn: getVietnamLists,
    });

    const {
        isPending: usaListsPending,
        isError: usaListsError,
        data: usaListsData,
    } = useQuery({
        queryKey: ['usaLists'],
        queryFn: getUsaLists,
    });
    const {
        isPending: canadaListsPending,
        isError: canadaListsError,
        data: canadaListsData,
    } = useQuery({
        queryKey: ['canadaLists'],
        queryFn: getCanadaLists,
    });

    const {
        isPending: englandListsPending,
        isError: englandListsError,
        data: englandListsData,
    } = useQuery({
        queryKey: ['englandLists'],
        queryFn: getEnglandLists,
    });

    const {
        isPending: franceListsPending,
        isError: franceListsError,
        data: franceListsData,
    } = useQuery({
        queryKey: ['franceLists'],
        queryFn: getFranceLists,
    });

    const {
        isPending: austrailaListsPending,
        isError: austrailaListsError,
        data: austrailaListsData,
    } = useQuery({
        queryKey: ['austrailaLists'],
        queryFn: getAustrailaLists,
    });

    const {
        isPending: egyptListsPending,
        isError: egyptListsError,
        data: egyptListsData,
    } = useQuery({
        queryKey: ['egyptLists'],
        queryFn: getEgyptLists,
    });
    useEffect(() => {
        if (!countryTypeDataPending && !countryTypeDataError) {
            const countryId = id;
            if (['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].includes(countryId)) {
                if (countryId === 'A') {
                    setResultType(japanListsData);
                } else if (countryId === 'B') {
                    setResultType(vietnamListsData);
                } else if (countryId === 'C') {
                    setResultType(usaListsData);
                } else if (countryId === 'D') {
                    setResultType(canadaListsData);
                } else if (countryId === 'E') {
                    setResultType(englandListsData);
                } else if (countryId === 'F') {
                    setResultType(franceListsData);
                } else if (countryId === 'G') {
                    setResultType(austrailaListsData);
                } else if (countryId === 'H') {
                    setResultType(egyptListsData);
                } else {
                    setResultType([]);
                }
            }
        }
    }, []);

    if (
        countryTypeDataPending ||
        japanListsPending ||
        vietnamListsPending ||
        usaListsPending ||
        canadaListsPending ||
        englandListsPending ||
        franceListsPending ||
        austrailaListsPending ||
        egyptListsPending
    ) {
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <h2>🙇🏻‍♀️잠시만 기다려 주세요</h2>
            </div>
        );
    }

    if (
        countryTypeDataError ||
        japanListsError ||
        vietnamListsError ||
        usaListsError ||
        canadaListsError ||
        englandListsError ||
        franceListsError ||
        austrailaListsError ||
        egyptListsError
    ) {
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <h2>🙅🏻‍♀️결과를 불러오지 못했습니다</h2>;
            </div>
        );
    }
    console.log('이건가', countryTypeData);
    console.log('도시', resultType);
    return (
        <div>
            <Navbar />
            {countryTypeData?.map((result) => {
                if (id?.includes(result.type)) {
                    return (
                        <div key={result.type}>
                            <Container>
                                <ResultTextWrap>
                                    <Description>
                                        {result.description}
                                    </Description>
                                    <CountryName>
                                        "{result.country}"
                                    </CountryName>
                                    <CommentsButton>
                                        댓글 남기러 가기
                                    </CommentsButton>
                                </ResultTextWrap>
                                <MapWrap>지도</MapWrap>
                            </Container>
                        </div>
                    );
                }
            })}
            <CityWrap>
                {resultType?.map((city) => {
                    return (
                        <div key={city.id}>
                            <CityImg src={city.img} />
                            <CityName>{city.title}</CityName>
                        </div>
                    );
                })}
            </CityWrap>
            <Footer />
        </div>
    );
}

const Container = styled.div`
    height: 300px;
    width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 30px auto;
    gap: 200px;
`;

const ResultTextWrap = styled.div`
    text-align: center;
    line-height: 30px;
`;

const Description = styled.p`
    font-size: 20px;
`;

const MapWrap = styled.div`
    width: 470px;
    height: 250px;
    background-color: gray;
`;

const CountryName = styled.h1`
    font-size: 30px;
    margin-top: 30px;
    color: #71d5c9;
`;
const CityWrap = styled.div`
    width: 100vw;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 200px;
    margin: 30px 0;
`;

const CityImg = styled.img`
    width: 200px;
    height: 200px;
    object-fit: cover;
    background-color: gray;
`;

const CityName = styled.p`
    font-size: 20px;
    margin-top: 30px;
    text-align: center;
`;
const CommentsButton = styled.button`
    width: 160px;
    height: 50px;
    border-radius: 50px;
    background-color: white;
    margin-top: 50px;
    border: 1px solid #71d5c9;
    color: #71d5c9;
    &:hover {
        background-color: #71d5c9;
        color: white;
    }
`;
export default SurveyResult;