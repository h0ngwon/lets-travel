import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();

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
        </div>
    );
};

export default HomePage;