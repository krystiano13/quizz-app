import React, { useEffect, useState } from 'react';
import { useSearchParams } from "react-router-dom";

//components
import { QuizzCard } from "../components/Home/QuizzCard";

interface Quizz {
    author: string,
    created_at: string | null,
    id: number,
    rates_count: number,
    rating_sum: number,
    title: string
}

export function Home() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [quizzes, setQuizzes] = useState<Quizz[]>([]);

    useEffect(() => {
        let url:string = "";
        let method:string = "POST";
        const data = new FormData();

        if(searchParams.get('search')) {
            method = "POST";
            data.append("search", searchParams.get('search') as string);
            url = "http://127.0.0.1:8000/api/quizz/search";
        }
        else if(searchParams.get('highestRated')) {
            method = "GET";
            url = "http://127.0.0.1:8000/api/quizz/highestRated";
        }
        else {
            method = "GET";
            url = "http://127.0.0.1:8000/api/quizz/latest";
        }

        if(method === "POST") {
            fetch(url, {
                method: "POST",
                body: data
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                })
        }
        else {
            fetch(url, {
                method: "GET",
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                })
        }
    }, [searchParams]);

    return (
       <main className="flex justify-center items-center h-[100vh]">
           <QuizzCard title="Test" rate={6.9} />
       </main>
    )
}