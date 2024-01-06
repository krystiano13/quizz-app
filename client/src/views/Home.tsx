import React, { useEffect, useState } from 'react';
import { useSearchParams } from "react-router-dom";

export function Home() {
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        if(searchParams.get('search')) {
            const data = new FormData();
            data.append("search", searchParams.get('search') as string);
            fetch('http://127.0.0.1:8000/api/quizz/search', {
                method: "POST",
                body: data
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                })
        }
    }, []);

    return (
       <></>
    )
}