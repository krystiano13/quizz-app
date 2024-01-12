import React from 'react';

//components
import { Separator } from '../components/ui/separator';
import { Button } from '../components/ui/button';

export default function QuizzFinish() {
    return (
        <main className="form-anim theme-rose w-[100vw] h-[100vh] flex flex-col justify-center p-20">
            <h1 className="font-bold text-5xl">Quizz finished !</h1>
            <Separator className="mt-6" />
            <h2>Your Score: 77%</h2>
            <h2>Your Rank: B</h2>
            <Button className="w-1/5">Go Back</Button>
        </main>
    )
}