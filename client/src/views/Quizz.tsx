import React from 'react';

// components
import { Card } from '../components/ui/card';

export default function Quizz() {
    return (
        <main className="w-[100vw] h-[100vh] flex flex-col items-center justify-center">
            <Card className="h-1/2 w-4/5"></Card>
            <div id="answers" className="w-4/5 h-[30%]"></div>
        </main>
    )
}