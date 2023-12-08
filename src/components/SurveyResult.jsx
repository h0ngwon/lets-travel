import { useQuery } from '@tanstack/react-query';
import { getCountryTypeData } from 'apis/testResult';
import { useNavigate, useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import MapComponent from './MapComponent';

function SurveyResult() {
    const { id } = useParams();
    const navigate = useNavigate();
    const {
        isPending: countryTypeDataPending,
        isError: countryTypeDataError,
        data: countryTypeData,
    } = useQuery({
        queryKey: ['countryTypeData'],
        queryFn: getCountryTypeData,
    });
    console.log('데이터', countryTypeData);

    if (countryTypeDataPending) {
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

    if (countryTypeDataError) {
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
    console.log('나라', id);
    return (
        <div>
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
                                    <CommentsButton
                                        onClick={() => navigate('/comment')}
                                    >
                                        댓글 남기러 가기
                                    </CommentsButton>
                                </ResultTextWrap>
                                <MapWrap>
                                    <MapComponent destination={result.coords} />
                                </MapWrap>
                            </Container>{' '}
                            <CityWrap>
                                {result.cities?.map((city) => {
                                    return (
                                        <div key={city.id}>
                                            <CityImg src={city.img} />
                                            <CityName>{city.title}</CityName>
                                        </div>
                                    );
                                })}
                            </CityWrap>
                        </div>
                    );
                } else {
                    return;
                }
            })}
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
    width: 620px;
    height: 300px;
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
    width: 230px;
    height: 230px;
    object-fit: cover;
    background-color: gray;
`;

const CityName = styled.p`
    font-size: 20px;
    margin-top: 20px;
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
