import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

// components
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';

const testQuizz = [
    {
        title: "Question 1",
        answer_a: "A",
        answer_b: "B",
        answer_c: "C",
        answer_d: "D",
        true_answer: "a"
    },
    {
        title: "Question 2",
        answer_a: "A",
        answer_b: "B",
        answer_c: "C",
        answer_d: "D",
        true_answer: "b"
    },
    {
        title: "Question 3",
        answer_a: "A",
        answer_b: "B",
        answer_c: "C",
        answer_d: "D",
        true_answer: "c"
    },
    {
        title: "Question 4",
        answer_a: "A",
        answer_b: "B",
        answer_c: "C",
        answer_d: "D",
        true_answer: "d"
    },
];

export default function Quizz() {
    const [questions, setQuestions] = useState(testQuizz);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [trueAnswer, setTrueAnswer] = useState<string>("a");
    const [answered, setAnswered] = useState<boolean>(false);
    const [points, setPoints] = useState<number>(0);
    const [answerLetter, setAnswerLetter] = useState<string>("");

    const navigate = useNavigate();

   function answer(ans:string) {
       if(answered) return;
       setAnswered(true);
       setAnswerLetter(ans);

       if(ans === trueAnswer) {
           setPoints(prev => prev + 1);
       }

       setTimeout(() => {
           if(currentQuestion + 1 < questions.length) {
               setCurrentQuestion(prev => prev + 1);
               setAnswerLetter("");
               setAnswered(false);
           }
           else {
               navigate('/');
           }
       }, 1000);
   }

    useEffect(() => {
        setTrueAnswer(questions[currentQuestion].true_answer);
    }, [currentQuestion]);

    return (
        <main className="w-[100vw] h-[100vh] flex flex-col items-center justify-center">
            <Card className="form-anim h-1/3 md:h-1/2 w-4/5 flex justify-center items-center">
                <h1 className="text-lg md:text-xl text-center font-bold max-w-[80%]">
                    { questions[currentQuestion].title }
                </h1>
            </Card>
            <div id="answers" className="form-anim w-4/5 h-[30%] flex flex-wrap justify-between">
                <Button
                    onClick={() => answer('a')}
                    className="w-[100%] md:w-1/2 h-1/4 md:h-1/2 text-base md:text-lg"
                    variant={answered ? answerLetter === "a" ? trueAnswer === "a" ? "secondary" : "destructive" : "ghost" : "outline"}>
                    { questions[currentQuestion].answer_a }
                </Button>
                <Button
                    onClick={() => answer('b')}
                    className="w-[100%] md:w-1/2 h-1/4 md:h-1/2 text-base md:text-lg"
                    variant={answered ? answerLetter === "b" ? trueAnswer === "b" ? "secondary" : "destructive" : "ghost" : "outline"}>
                    { questions[currentQuestion].answer_b }
                </Button>
                <Button
                    onClick={() => answer('c')}
                    className="w-[100%] md:w-1/2 h-1/4 md:h-1/2 text-base md:text-lg"
                    variant={answered ? answerLetter === "c" ? trueAnswer === "c" ? "secondary" : "destructive" : "ghost" : "outline"}>
                    { questions[currentQuestion].answer_c }
                </Button>
                <Button
                    onClick={() => answer('d')}
                    className="w-[100%] md:w-1/2 h-1/4 md:h-1/2 text-base md:text-lg"
                    variant={answered ? answerLetter === "d" ? trueAnswer === "d" ? "secondary" : "destructive" : "ghost" : "outline"}>
                    { questions[currentQuestion].answer_d }
                </Button>
            </div>
        </main>
    )
}