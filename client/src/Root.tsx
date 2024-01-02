import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

//views
import { Home } from './views/Home';
const Login = lazy(() => import('./views/Login'));
const Register = lazy(() => import('./views/Register'));

//components
import { Loader } from './components/Loader/Loader';

export function Root() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Suspense fallback={<Loader />}>
                    <Login />
                </Suspense>} />
                <Route path='/register' element={<Suspense fallback={<Loader />}>
                    <Register />
                </Suspense>} />
            </Routes>
        </BrowserRouter>
    )
}