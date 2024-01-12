import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";

// components
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';

const testQuizz = [
    {
        question: "Question 1",
        answer_a: "A",
        answer_b: "B",
        answer_c: "C",
        answer_d: "D",
        true_answer: "a"
    },
];

export default function Quizz() {
    const [questions, setQuestions] = useState(testQuizz);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [trueAnswer, setTrueAnswer] = useState<string>("a");
    const [answered, setAnswered] = useState<boolean>(false);
    const [points, setPoints] = useState<number>(0);
    const [answerLetter, setAnswerLetter] = useState<string>("");
    const [searchParams, setSearchParams] = useSearchParams();
    const [loaded, setLoaded] = useState<boolean>(false);
    const navigate = useNavigate();

    const pointsRef = useRef<number>(0);

    useEffect(() => {
        pointsRef.current = points;
    }, [points]);

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
               const score = Math.round(pointsRef.current / questions.length * 100);
               let rank = "";
               alert(score);

               if(score < 25) {
                   rank = "E";
               }
               else if(score >= 25 && score < 50) {
                   rank = "D";
               }
               else if(score >= 50 && score < 60) {
                   rank = "C";
               }
               else if(score >= 60 && score < 70) {
                   rank = "B";
               }
               else if(score >= 70 && score < 80) {
                   rank = "A";
               }
               else if(score >= 80 && score < 90) {
                   rank = "S";
               }
               else if(score >= 90 && score <= 100) {
                   rank = "S+";
               }

               navigate(`/quizzfinish?rank=${rank}&score=${score}`);
           }
       }, 1000);
   }

    useEffect(() => {
        if(!searchParams.get('id')) {
            navigate('/');
            return;
        }

        fetch(`http://127.0.0.1:8000/api/question/all/${searchParams.get('id')}`)
            .then(res => res.json())
            .then(data => {
                setQuestions(data.result);
                if(data.result.length < 1) {
                    navigate('/');
                    return;
                }
            })
            .then(() => setLoaded(true))
    }, []);

   useEffect(() => {
       setTrueAnswer(questions[currentQuestion].true_answer.toLowerCase());
   },[currentQuestion])

    return (
        <main className="w-[100vw] h-[100vh] flex flex-col items-center justify-center">
            {
                loaded &&
                <>
                    <Card className="form-anim h-1/3 md:h-1/2 w-4/5 flex justify-center items-center">
                        <h1 className="text-lg md:text-xl text-center font-bold max-w-[80%]">
                            { questions[currentQuestion].question }
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
                </>
            }
        </main>
    )
}