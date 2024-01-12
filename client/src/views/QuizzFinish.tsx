import React from 'react';

//components
import { Separator } from '../components/ui/separator';
import { Button } from '../components/ui/button';

export default function QuizzFinish() {
    return (
        <main className="side-anim theme-rose w-[100vw] h-[100vh] flex flex-col justify-center p-20">
            <h1 className="font-bold text-3xl md:text-5xl">Quizz finished !</h1>
            <Separator className="mt-6" />
            <h2 className="mt-6 font-semibold text-3xl">Your Score:
                <span className="text-rose-600 text-4xl font-bold">
                {" "}77%
                </span>
            </h2>
            <h2 className="mt-6 font-semibold text-3xl">Your Rank:
                <span className="text-rose-600 text-4xl font-bold">
                {" "}B
                </span>
            </h2>
            <Button className="w-3/5 md:w-1/5 mt-6">Go Back</Button>
        </main>
    )
}