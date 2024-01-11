import React, { useState } from 'react';

// components
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';

export default function Quizz() {
    const [trueAnswer, setTrueAnswer] = useState<string>("a");
    const [answered, setAnswered] = useState<boolean>(false);
    const [points, setPoints] = useState<number>(0);
    const [answerLetter, setAnswerLetter] = useState<string>("");

   function answer(ans:string) {
       if(answered) return;
       setAnswered(true);
       setAnswerLetter(ans);

       if(ans === trueAnswer) {
           setPoints(prev => prev + 1);
       }
   }

    return (
        <main className="w-[100vw] h-[100vh] flex flex-col items-center justify-center">
            <Card className="form-anim h-1/3 md:h-1/2 w-4/5 flex justify-center items-center">
                <h1 className="text-lg md:text-xl text-center font-bold max-w-[80%]">
                    Test quizz question. Lorem ipsum dolor ...
                </h1>
            </Card>
            <div id="answers" className="form-anim w-4/5 h-[30%] flex flex-wrap justify-between">
                <Button
                    onClick={() => answer('a')}
                    className="w-[100%] md:w-1/2 h-1/4 md:h-1/2 text-base md:text-lg"
                    variant={answered ? answerLetter === "a" ? trueAnswer === "a" ? "secondary" : "destructive" : "ghost" : "outline"}>
                    Answer A
                </Button>
                <Button
                    onClick={() => answer('b')}
                    className="w-[100%] md:w-1/2 h-1/4 md:h-1/2 text-base md:text-lg"
                    variant={answered ? answerLetter === "b" ? trueAnswer === "b" ? "secondary" : "destructive" : "ghost" : "outline"}>
                    Answer B
                </Button>
                <Button
                    onClick={() => answer('c')}
                    className="w-[100%] md:w-1/2 h-1/4 md:h-1/2 text-base md:text-lg"
                    variant={answered ? answerLetter === "c" ? trueAnswer === "c" ? "secondary" : "destructive" : "ghost" : "outline"}>
                    Answer C
                </Button>
                <Button
                    onClick={() => answer('d')}
                    className="w-[100%] md:w-1/2 h-1/4 md:h-1/2 text-base md:text-lg"
                    variant={answered ? answerLetter === "d" ? trueAnswer === "d" ? "secondary" : "destructive" : "ghost" : "outline"}>
                    Answer D
                </Button>
            </div>
        </main>
    )
}