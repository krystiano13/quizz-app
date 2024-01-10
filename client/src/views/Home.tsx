import React, { useEffect, useState } from 'react';
import { useSearchParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Cookies from 'universal-cookie';

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
    const cookies = new Cookies();

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
                    setQuizzes(prev => data.result);
                })
        }
        else {
            fetch(url, {
                method: "GET",
            })
                .then(res => res.json())
                .then(data => {
                    setQuizzes(prev => data.result);
                })
        }
    }, [searchParams]);

    return (
       <main className="flex flex-wrap content-start h-[100vh] gap-3 pt-[5rem] pb-3 pl-3 pr-3">
           {
               quizzes.map(item => (
                   <NavLink to={`/quizzpreview?id=${item.id}`}>
                       <QuizzCard
                           key={item.id}
                           author={item.author}
                           title={item.title}
                           rate={(item.rating_sum / item.rates_count).toFixed(2)}
                       />
                   </NavLink>
               ))
           }
       </main>
    )
}