import axios from 'axios';

// 테스트 결과에 따른 도시데이터 요청 API
const getJapanLists = async () => {
    const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/japan`,
    );
    console.log('japanList', response);
    return response.data;
};

const getVietnamLists = async () => {
    const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/vietnam`,
    );
    console.log('vietnamList', response);
    return response.data;
};

const getCanadaLists = async () => {
    const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/canada`,
    );
    console.log('canadaList', response);
    return response.data;
};

const getEnglandLists = async () => {
    const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/england`,
    );
    console.log('englandList', response);
    return response.data;
};

const getFranceLists = async () => {
    const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/france`,
    );
    console.log('franceList', response);
    return response.data;
};

const getAustrailaLists = async () => {
    const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/austraila`,
    );
    console.log('austrailaList', response);
    return response.data;
};

const getEgyptLists = async () => {
    const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/egypt`,
    );
    console.log('egyptList', response);
    return response.data;
};

export {
    getJapanLists,
    getVietnamLists,
    getCanadaLists,
    getEnglandLists,
    getFranceLists,
    getAustrailaLists,
    getEgyptLists,
};
