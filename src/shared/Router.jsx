import CommentPage from 'pages/CommentPage';
import HomePage from 'pages/HomePage';
import ResultPage from 'pages/ResultPage';
import SurveyPage from 'pages/SurveyPage';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/survey' element={<SurveyPage />} />
                <Route path='/comment' element={<CommentPage />} />
                <Route path='/result/:id' element={<ResultPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
