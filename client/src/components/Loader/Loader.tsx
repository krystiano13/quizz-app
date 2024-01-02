import React from 'react';

import './Loader.css';

export function Loader() {
    return (
        <main className="theme-rose w-[100vw] h-[100vh] flex justify-center items-center">
            <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </main>
    )
}