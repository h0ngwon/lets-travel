import React, { useState } from 'react'
import { setCountry } from '../../redux/modules/countrySlice';
import { useDispatch } from 'react-redux';


function CountryBtn({countries}) {

    const dispatch = useDispatch();


  return (
    <div>
        {countries.map((el) => (
            <button 
                key={el}
                onClick={(e) => {
                  dispatch(setCountry(e.target.textContent))
                }}
            >
                {el}
            </button>
        ))}
    </div>
  )
}

export default CountryBtn
