import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

//components
import { Home } from './views/Home';

export function Root() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
            </Routes>
        </BrowserRouter>
    )
}