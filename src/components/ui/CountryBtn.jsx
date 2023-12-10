import React, { useState } from 'react';
import { setCountry } from '../../redux/modules/countrySlice';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

function CountryBtn({ countries }) {
    const dispatch = useDispatch();
    const [activeIndex, setActiveIndex] = useState(null);

    const handleButtonClick = (index) => {
        dispatch(setCountry(countries[index]));
        setActiveIndex(index);
    };

    return (
        <StCountryBtnDiv>
            {countries.map((el, index) => (
                <StCountryBtn
                    key={el}
                    onClick={() => handleButtonClick(index)}
                    className={activeIndex === index ? 'active' : ''}
                >
                    {el}
                </StCountryBtn>
            ))}
        </StCountryBtnDiv>
    );
}

const StCountryBtnDiv = styled.div`
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 40px;
`;
const StCountryBtn = styled.button`
    border-style: none;
    border-radius: 10px;
    padding: 15px;
    cursor: pointer;

    &:hover,
    &:focus,
    &.active {
        background-color: #71d5c9;
        color: white;
    }
`;

export default CountryBtn;
