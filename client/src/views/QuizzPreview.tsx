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

export default function QuizzPreview() {
    const [searchParams, setSearchParams] = useSearchParams();
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

    useEffect(() => {
        if(!searchParams.get("id")) {
            navigate('/');
            return;
        }
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
                            <Button className="rounded-full w-[1.5rem] h-[2rem] mr-2"></Button>
                            <Button className="rounded-full w-[1.5rem] h-[2rem] mr-2"></Button>
                            <Button className="rounded-full w-[1.5rem] h-[2rem] mr-2"></Button>
                            <Button className="rounded-full w-[1.5rem] h-[2rem] mr-2"></Button>
                            <Button className="rounded-full w-[1.5rem] h-[2rem] mr-2"></Button>
                        </div>
                    </section>
                    <Button>Start Quizz</Button>
                </CardContent>
            </Card>
        </main>
    )
}