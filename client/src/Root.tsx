import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

//views
import { Home } from './views/Home';
import { Login } from './views/Login';
import { Register } from './views/Register';

export function Root() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
            </Routes>
        </BrowserRouter>
    )
}