import { useQuery } from '@tanstack/react-query';
import { getCountryTypeData } from 'apis/testResult';
import { useNavigate, useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import MapComponent from './MapComponent';
import Youtube from './Youtube';

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

    const youtubePopupHandler = (title) => {
        withReactContent(Swal).fire({
            html: <Youtube cityTitle={title} />,
        });
    };

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
                                        여행지 공유하러 가기 🛫
                                    </CommentsButton>
                                </ResultTextWrap>
                                <MapWrap>
                                    <MapComponent destination={result.coords} />
                                </MapWrap>
                            </Container>
                            <Text>🎬 이미지 클릭시 영상시청이 가능합니다</Text>
                            <CityWrap>
                                {result.cities?.map((city) => {
                                    return (
                                        <div key={city.id}>
                                            <CityImg
                                                src={city.img}
                                                onClick={() => {
                                                    youtubePopupHandler(
                                                        city.title,
                                                    );
                                                }}
                                            />
                                            <CityName>{city.title}</CityName>
                                        </div>
                                    );
                                })}
                            </CityWrap>
                            <Youtube />
                        </div>
                    );
                }
            })}
        </div>
    );
}

const Container = styled.div`
    height: 60vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 170px;
`;

const ResultTextWrap = styled.div`
    text-align: center;
    line-height: 30px;
`;

const Description = styled.p`
    font-size: 20px;
`;

const MapWrap = styled.div`
    width: 650px;
    height: 400px;
    background-color: gray;
`;

const CountryName = styled.h1`
    font-size: 40px;
    margin-top: 30px;
    color: #71d5c9;
`;
const CityWrap = styled.div`
    width: 100vw;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 180px;
    margin: 20px 0 70px 0;
`;

const Text = styled.p`
    text-align: left;
    margin-left: 225px;
    color: #a3a3a3;
`;
const CityImg = styled.img`
    width: 250px;
    height: 250px;
    object-fit: cover;
    cursor: pointer;
`;

const CityName = styled.p`
    font-size: 20px;
    margin-top: 20px;
    text-align: center;
    color: #585858;
`;
const CommentsButton = styled.button`
    width: 200px;
    height: 50px;
    font-size: 15px;
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
