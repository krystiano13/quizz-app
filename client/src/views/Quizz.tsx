import React from 'react';

// components
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';

export default function Quizz() {
    return (
        <main className="w-[100vw] h-[100vh] flex flex-col items-center justify-center">
            <Card className="h-1/2 w-4/5 flex justify-center items-center">
                <h1 className="text-xl font-bold max-w-[80%]">
                    Test quizz question. Lorem ipsum dolor ...
                </h1>
            </Card>
            <div id="answers" className="w-4/5 h-[30%] flex flex-wrap justify-between">
                <Button className="w-1/2 h-1/2 text-lg" variant="outline">Answer A</Button>
                <Button className="w-1/2 h-1/2 text-lg" variant="outline">Answer B</Button>
                <Button className="w-1/2 h-1/2 text-lg" variant="outline">Answer C</Button>
                <Button className="w-1/2 h-1/2 text-lg" variant="outline">Answer D</Button>
            </div>
        </main>
    )
}