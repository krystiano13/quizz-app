import React, {useEffect, useState} from 'react';
import { NavLink, useSearchParams, useNavigate } from 'react-router-dom';

//components
import { Separator } from '../components/ui/separator';
import { Button } from '../components/ui/button';

export default function QuizzFinish() {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const [score, setScore] = useState<string>("0");
    const [rank, setRank] = useState<string>("");

    useEffect(() => {
        if(!searchParams.get('score') || !searchParams.get('rank')) {
            navigate('/');
            return;
        }

        setScore(searchParams.get("score") as string);
        setRank(searchParams.get("rank") as string);
    }, []);

    return (
        <main className="side-anim theme-rose w-[100vw] h-[100vh] flex flex-col justify-center p-20">
            <h1 className="font-bold text-3xl md:text-5xl">Quizz finished !</h1>
            <Separator className="mt-6" />
            <h2 className="mt-6 font-semibold text-3xl">Your Score:
                <span className="text-rose-600 text-4xl font-bold">
                {" "}{score}%
                </span>
            </h2>
            <h2 className="mt-6 font-semibold text-3xl">Your Rank:
                <span className="text-rose-600 text-4xl font-bold">
                {" "}{rank}
                </span>
            </h2>
            <NavLink to="/">
                <Button className="w-3/5 md:w-1/5 mt-6">Go Back</Button>
            </NavLink>
        </main>
    )
}