import axios from 'axios';

// 테스트 질문, 결과 요청API

// 질문요청
const getCountryLists = async () => {
    const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/countryList`,
    );
    console.log('countryList', response);
    return response.data;
};

// 결과요청
const getCountryTypeData = async () => {
    const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/countryTypeData`,
    );
    console.log('countryTypeData', response);
    return response.data;
};
export { getCountryLists, getCountryTypeData };
