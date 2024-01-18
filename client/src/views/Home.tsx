import React, { useEffect, useState, useRef } from 'react';
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

interface Rating {
    username: string,
    rating_value: number
}

export function Home() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [quizzes, setQuizzes] = useState<Quizz[]>([]);
    const [edit, setEdit] = useState<boolean>(false);
    const cookies = new Cookies();

    const quizzesRef = useRef<Quizz[]>([]);
    const [seed, setSeed] = useState(0);

    useEffect(() => {
        quizzesRef.current = quizzes;
    }, [quizzes]);

    useEffect(() => {
        let url:string = "";
        let method:string = "POST";
        const data = new FormData();
        setEdit(false);

        if(searchParams.get('search')) {
            method = "POST";
            data.append("search", searchParams.get('search') as string);
            url = "http://127.0.0.1:8000/api/quizz/search";
        }
        else if(searchParams.get('highestRated')) {
            method = "GET";
            url = "http://127.0.0.1:8000/api/quizz/highestRated";
        }
        else if(searchParams.get('quizztoedit') && cookies.get('quizzapp_token')) {
            method = "GET";
            setEdit(true);
            url = `http://127.0.0.1:8000/api/quizz/user/${cookies.get("quizzapp_username")}`;
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
                    const result = data.result;
                    result.forEach((item:Quizz) => {
                        fetch(`http://127.0.0.1:8000/api/ratings/${item.id}`)
                            .then(res => res.json())
                            .then(dat => {
                                console.log(dat);
                                item.rates_count = dat.count;
                                item.rating_sum = 0;
                                dat.result.forEach((el:Rating) => {
                                    item.rating_sum += el.rating_value;
                                })
                                console.log(result);
                            })
                            .then(() => {
                                setQuizzes(prev => result);
                                setSeed(Math.random());
                            })
                    })
                })
        }
        else {
            fetch(url, {
                method: "GET",
            })
                .then(res => res.json())
                .then(data => {
                    const result = data.result;
                    result.forEach((item:Quizz) => {
                        fetch(`http://127.0.0.1:8000/api/ratings/${item.id}`)
                            .then(res => res.json())
                            .then(dat => {
                                console.log(dat);
                                item.rates_count = dat.count;
                                item.rating_sum = 0;
                                dat.result.forEach((el:Rating) => {
                                    item.rating_sum += el.rating_value;
                                })
                                console.log(result);
                            })
                            .then(() => {
                                setQuizzes(prev => result);
                                setSeed(Math.random());
                            })
                    })
                })
        }
    }, [searchParams]);

    return (
       <main id={seed.toString()} className="flex flex-wrap content-start h-[100vh] gap-3 pt-[5rem] pb-3 pl-3 pr-3">
           {
               quizzes.map(item => (
                   <NavLink to={edit ? `/quizzeditor?mode=edit&id=${item.id}` : `/quizzpreview?id=${item.id}`}>
                       <QuizzCard
                           key={item.id}
                           author={item.author}
                           title={item.title}
                           rate={item.rates_count > 0 ? (Number(item.rating_sum) / Number(item.rates_count)).toFixed(2) : "0.00"}
                       />
                   </NavLink>
               ))
           }
       </main>
    )
}