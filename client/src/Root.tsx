import React, {lazy, Suspense, useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cookies from 'universal-cookie';

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
    const [isLogged, setIsLogged] = useState<boolean>(false);
    const [username, setUsername] = useState<string>("Admin");

    function checkLogin() {
        const cookies = new Cookies();

        if(cookies.get('quizzapp_token') === undefined) {
            setIsLogged(false);
        }
        else {
            setIsLogged(true);
            setUsername(cookies.get('quizzapp_username'));
        }
    }

    useEffect(() => {
        checkLogin();
    }, []);

    return (
        <BrowserRouter>
            <Navbar isLogged={isLogged} username={username} />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Suspense fallback={<Loader />}>
                    <Login checkLogin={checkLogin} />
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