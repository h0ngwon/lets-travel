import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

//이 아래로 테스트목적 import
import MapComponent from 'components/MapComponent';
import axios from 'axios';

const HomePage = () => {
    const navigate = useNavigate();
    //~~~~~~~~~~~~테스트 목적~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    const [destCoords, setDestCorrds] = useState();
    const fetchData = async () => {
        const { data } = await axios.get(
            'http://localhost:4000/countryTypeData?country=호주',
        );

        setDestCorrds(data[0].coords);
    };
    useEffect(() => {
        fetchData();
    }, []);
    //~~~~~~~~~~~~~~~테스트 목적~~~~~~~~~~~~~~~~~~~~~~~~~~
    return (
        <div>
            <h1>Homepage</h1>
            <button
                onClick={() => {
                    navigate('/survey');
                }}
            >
                임시 여행하러가기
            </button>
            <div style={{ width: '1000px', height: '600px' }}>
                <MapComponent destination={destCoords} />
            </div>
        </div>
    );
};

export default HomePage;
