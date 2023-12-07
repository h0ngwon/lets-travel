import HomePage from 'page/HomePage';
import Layout from 'components/Layout';
import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path='/' element={<HomePage />} />
                </Route>
                <Route
                    path='*'
                    element={
                        <>
                            <h1>잘못된 URL을 입력하였습니다. </h1>
                            <Link to='/'>홈으로 이동</Link>
                        </>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
