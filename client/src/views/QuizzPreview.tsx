import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from "react-router-dom";

// components
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';

interface Info {
    id: number,
    created_at: string;
    updated_at: string;
    title: string;
    author: string;
    rating_sum: number;
    rates_count: number;
    description: string;
}

type rating = 0|1|2|3|4|5;

export default function QuizzPreview() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [rating, setRating] = useState<rating>(0);
    const [info, setInfo] = useState<Info>({
        id: -1,
        created_at: "",
        updated_at: "",
        title: "",
        author: "",
        rating_sum: 0,
        rates_count: 0,
        description: "",
    });
    const navigate = useNavigate();

    function rate(value:rating):void {
        setRating(value);
    }

    useEffect(() => {
        if(!searchParams.get("id")) {
            navigate('/');
            return;
        }

        fetch(`http://127.0.0.1:8000/api/quizz/id/${searchParams.get('id')}`)
            .then(res => res.json())
            .then(data => {
                if(data.status) {
                    setInfo({
                        id: data.result[0].id,
                        created_at: data.result[0].created_at,
                        updated_at: data.result[0].updated_at,
                        title: data.result[0].title,
                        author: data.result[0].author,
                        rating_sum: data.result[0].rating_sum,
                        rates_count: data.result[0].rates_count,
                        description: data.result[0].description,
                    });
                }
            })
    }, []);

    return (
        <main className="theme-rose w-[100vw] h-[100vh] flex justify-center items-center">
            <Card className="w-4/5 h-2/3 side-anim">
                <CardHeader>
                    <CardTitle className="text-xl md:text-4xl">
                        { info.title }
                    </CardTitle>
                </CardHeader>
                <Separator />
                <CardContent>
                    <CardDescription className="mt-6 mb-6 text-xs md:text-xl max-w-[100%] lg:max-w-[60%]">
                        { info.description }
                    </CardDescription>
                    <section id="rating">
                        <h2 className="text-lg md:text-3xl mb-4">
                            Rate Quizz:
                        </h2>
                        <div id="buttons" className="mb-4">
                            <Button
                                onClick={() => rate(1)}
                                variant={rating >= 1 ? "default" : "secondary"}
                                className="rounded-full w-[1.5rem] h-[2rem] mr-2"></Button>
                            <Button
                                onClick={() => rate(2)}
                                variant={rating >= 2 ? "default" : "secondary"}
                                className="rounded-full w-[1.5rem] h-[2rem] mr-2"></Button>
                            <Button
                                onClick={() => rate(3)}
                                variant={rating >= 3 ? "default" : "secondary"}
                                className="rounded-full w-[1.5rem] h-[2rem] mr-2"></Button>
                            <Button
                                onClick={() => rate(4)}
                                variant={rating >= 4 ? "default" : "secondary"}
                                className="rounded-full w-[1.5rem] h-[2rem] mr-2"></Button>
                            <Button
                                onClick={() => rate(5)}
                                variant={rating >= 5 ? "default" : "secondary"}
                                className="rounded-full w-[1.5rem] h-[2rem] mr-2"></Button>
                        </div>
                    </section>
                    <Button>Start Quizz</Button>
                </CardContent>
            </Card>
        </main>
    )
}