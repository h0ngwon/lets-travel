import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { setCountry } from '../../redux/modules/countrySlice';

function CountryBtn({ countries }) {
    const dispatch = useDispatch();

    return (
        <StCountryBtnDiv>
            {countries.map((el) => (
                <StCountryBtn
                    key={el}
                    onClick={(e) => {
                        dispatch(setCountry(e.target.textContent));
                    }}
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
    &:active,
    &.active {
        background-color: #71d5c9;
        color: white;
    }
`;

export default CountryBtn;
