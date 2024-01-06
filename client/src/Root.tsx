import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

//views
import { Home } from './views/Home';
const Login = lazy(() => import('./views/Login'));
const Register = lazy(() => import('./views/Register'));
const Profile = lazy(() => import('./views/Profile'));
const Search = lazy(() => import('./views/Search'));

//components
import { Loader } from './components/Loader/Loader';
import { Navbar } from './components/Navbar/Navbar';

export function Root() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Suspense fallback={<Loader />}>
                    <Login />
                </Suspense>} />
                <Route path='/register' element={<Suspense fallback={<Loader />}>
                    <Register />
                </Suspense>} />
                <Route path='/profile' element={<Suspense fallback={<Loader />}>
                    <Profile />
                </Suspense>} />
                <Route path='/search' element={<Suspense fallback={<Loader />}>
                    <Search />
                </Suspense>} />
            </Routes>
        </BrowserRouter>
    )
}