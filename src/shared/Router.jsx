import HomePage from 'pages/HomePage';
import SurveyPage from 'pages/SurveyPage';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/survey' element={<SurveyPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
