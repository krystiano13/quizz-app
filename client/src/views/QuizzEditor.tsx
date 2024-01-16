import React, { useState, useEffect } from 'react';
import { NavLink, useSearchParams, useNavigate } from "react-router-dom";

//components
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { EditorForm } from "../components/QuizzEditor/EditorForm";

type modeValue = "edit" | "create";

export type question = {
    id: number,
    title: string;
    answer_A: string;
    answer_B: string;
    answer_C: string;
    answer_D: string;
    true_answer: "a" | "b" | "c" | "d";
}

export default function QuizzEditor() {
    const [formShown, setFormShown] = useState<boolean>(false);
    const [mode, setMode] = useState<modeValue>("create");
    const [id, setId] = useState<string>("");
    const [searchParams, setSearchParams] = useSearchParams();
    const [questions, setQuestions] = useState<question[]>([]);
    const navigate = useNavigate();

    const addQuestion = (item:question) => {
        const arr: question[] = questions;
        arr.push(item);
        setQuestions(arr);
    }

    useEffect(() => {
        if(!searchParams.get('mode')) {
            navigate('/');
            return;
        }
        else if(searchParams.get('mode') === "create") {
            setMode("create");
        }
        else if(searchParams.get('mode') === "edit") {
            setMode("edit");
            if(!searchParams.get("id")) {
                navigate('/');
                return;
            }
            setId(searchParams.get("id") as string);
        }

    }, []);

    return (
        <>
            {
                formShown && <EditorForm id={id} addQuestion={addQuestion} />
            }
            <main
                className="side-anim theme-rose w-[100vw] h-[100vh] flex flex-col lg:flex-row justify-evenly items-center">
                <Card className="lg:w-[30%] w-[90%] lg:h-[80%] h-[38%]" id="titleSection">
                    <form className="w-full h-full flex flex-col items-center justify-center gap-3 lg:gap-6">
                        <Input
                            className="w-[90%] lg:text-xl text-base text-center"
                            placeholder="title"
                            name="title"
                            required
                        />
                        <p className="lg:text-xl text-base font-semibold">Questions count : 0</p>
                        <Button size="sm" className="max-w-[90%] w-3/5 text-sm lg:text-lg">Save Quizz</Button>
                        {
                            mode === "edit" && <>
                                <Button size="sm" className="max-w-[90%] w-3/5 text-sm lg:text-lg">Hide Quizz</Button>
                                <Button size="sm" className="max-w-[90%] w-3/5 text-sm lg:text-lg">Delete Quizz</Button>
                            </>
                        }
                        {
                            mode === "create" && <>
                               <NavLink className="max-w-[90%] w-3/5" to="/">
                                   <Button size="sm" className="w-full text-sm lg:text-lg">Cancel</Button>
                               </NavLink>
                            </>
                        }
                    </form>
                </Card>
                <Card
                    className="lg:w-[60%] lg:h-[80%] w-[90%] h-[40%] flex flex-col gap-6 items-center p-4 overflow-y-auto"
                    id="questions">
                    <Button variant="secondary" className="flex justify-between p-2 w-[90%] lg:w-4/5 text-xl">
                        <span className="text-base lg:text-lg">Question 1</span>
                        <section className="flex gap-3">
                            <Button className="h-[70%]">Edit</Button>
                            <Button className="h-[70%]" variant="destructive">Delete</Button>
                        </section>
                    </Button>
                    <Button variant="secondary" className="flex justify-between p-2 w-[90%] lg:w-4/5 text-xl">
                        <span className="text-base lg:text-lg">Question 2</span>
                        <section className="flex gap-3">
                            <Button className="h-[70%]">Edit</Button>
                            <Button className="h-[70%]" variant="destructive">Delete</Button>
                        </section>
                    </Button>
                    <Button
                        onClick={() => setFormShown(prev => !prev)}
                        className="w-4/5 text-xl">
                        +
                    </Button>
                </Card>
            </main>
        </>
    )
}