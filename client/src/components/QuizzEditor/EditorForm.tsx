import React, { useState } from 'react';
import type { question } from "../../views/QuizzEditor";

//components
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

interface Props {
    id: string,
    index: number,
    addQuestion: (item:question) => void
}

export const EditorForm:React.FC<Props> = ({ id ,addQuestion, index }) => {
    const [trueAnswer, setTrueAnswer] = useState<string>("a");

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const data = new FormData(e.target as HTMLFormElement);
        data.append("true_answer", trueAnswer);
        data.append("quizz_id", id);

        // clientside

        addQuestion({
            id: index,
            title: data.get("question") as string,
            answer_A: data.get("answer_a") as string,
            answer_B: data.get("answer_b") as string,
            answer_C: data.get("answer_c") as string,
            answer_D: data.get("answer_d") as string,
            true_answer: trueAnswer as "a" | "b" | "c" | "d",
            quizz_id: id as string
        });

        // serverside
    }

    return (
        <div className="op-anim theme-rose fixed z-50 bg-black bg-opacity-60 w-[100vw] h-[100vh] flex items-center justify-center">
            <Card className="p-8 w-[85%] lg:w-[40%]">
                <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full">
                    <Textarea name="question" required className="max-h-[10rem]" placeholder="question"></Textarea>
                    <section className="flex w-full">
                        <Input name="answer_a" required placeholder="Answer A"/>
                        <Button
                            type="button"
                            onClick={() => setTrueAnswer("a")}
                            variant={trueAnswer === "a" ? "default" : "secondary"}>
                            {
                                trueAnswer === "a" ? "True" : "False"
                            }
                        </Button>
                    </section>
                    <section className="flex w-full">
                        <Input name="answer_b" required placeholder="Answer B"/>
                        <Button
                            type="button"
                            onClick={() => setTrueAnswer("b")}
                            variant={trueAnswer === "b" ? "default" : "secondary"}>
                            {
                                trueAnswer === "b" ? "True" : "False"
                            }
                        </Button>
                    </section>
                    <section className="flex w-full">
                        <Input name="answer_c" required placeholder="Answer C"/>
                        <Button
                            type="button"
                            onClick={() => setTrueAnswer("c")}
                            variant={trueAnswer === "c" ? "default" : "secondary"}>
                            {
                                trueAnswer === "c" ? "True" : "False"
                            }
                        </Button>
                    </section>
                    <section className="flex w-full">
                        <Input name="answer_d" required placeholder="Answer D"/>
                        <Button
                            type="button"
                            onClick={() => setTrueAnswer("d")}
                            variant={trueAnswer === "d" ? "default" : "secondary"}>
                            {
                                trueAnswer === "d" ? "True" : "False"
                            }
                        </Button>
                    </section>
                    <Button className="w-full">Save</Button>
                </form>
            </Card>
        </div>
    )
}