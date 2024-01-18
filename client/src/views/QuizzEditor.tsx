import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useSearchParams, useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';

//components
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { EditorForm } from "../components/QuizzEditor/EditorForm";
import { Loader } from '../components/Loader/Loader';

type modeValue = "edit" | "create";

export type question = {
    id: number;
    question: string;
    answer_a: string;
    answer_b: string;
    answer_c: string;
    answer_d: string;
    true_answer: "a" | "b" | "c" | "d";
    quizz_id: string
}

export default function QuizzEditor() {
    const [formShown, setFormShown] = useState<boolean>(false);
    const [formMode, setFormMode] = useState<modeValue>("create");
    const [mode, setMode] = useState<modeValue>("create");
    const [id, setId] = useState<string>("");
    const [searchParams, setSearchParams] = useSearchParams();
    const [questions, setQuestions] = useState<question[]>([]);
    const navigate = useNavigate();

    const [index, setIndex] = useState<number>(0);
    const [editIndex, setEditIndex] = useState<number>(0);
    const [editData, setEditData] = useState<question>({
        id: -1,
        question: "",
        answer_a: "suema",
        answer_b: "",
        answer_c: "",
        answer_d: "",
        true_answer: "a",
        quizz_id: id
    });

    const editRef = useRef<question>(editData);
    const cookies = new Cookies();
    const [pending, setPending] = useState<boolean>(false);
    const [title, setTitle] = useState<string>("");
    const [hidden, setHidden] = useState<boolean>(false);

    useEffect(() => {
        editRef.current = editData;
    }, [editData, editIndex]);

    const addQuestion = (item:question) => {
        const arr: question[] = questions;
        arr.push(item);
        setQuestions(arr);
        setFormShown(false);
        setIndex(prev => prev + 1);
        editRef.current = arr[arr.length - 1];

        if(mode === "edit") {
            setPending(true);
            const formData = new FormData();
            formData.append('answer_a', item.answer_a);
            formData.append('answer_b', item.answer_b);
            formData.append('answer_c', item.answer_c);
            formData.append('answer_d', item.answer_d);
            formData.append('true_answer', item.true_answer);
            formData.append('quizz_id', id.toString());
            formData.append('question', item.question);

            fetch(`http://127.0.0.1:8000/api/question/create`, {
                method: "POST",
                body: formData,
                headers: {
                    Authorization: `Bearer ${cookies.get('quizzapp_token')}`
                },
            })
                .then(res => res.json())
                .then(() => {
                    setPending(false);
                })
        }
    }

    const deleteQuestion = (index:number) => {
        // clientside
        const arr: question[] = questions;
        setQuestions(arr.filter(item => item.id !== index));

        // serverSide

        if(mode === "edit") {
            setPending(true);
            const formData = new FormData();
            formData.append('id', index.toString());
            fetch('http://127.0.0.1:8000/api/question/delete', {
                method: "POST",
                body: formData,
                headers: {
                    Authorization: `Bearer ${cookies.get('quizzapp_token')}`
                },
            })
                .then(res => res.json())
                .then(() => {
                    setPending(false);
                })
        }
    }

    const editQuestion = (item:question) => {
        const arr: question[] = questions;
        const arrIndex: number = arr.findIndex(item => item.id === editIndex);
        arr[arrIndex] = item;
        editRef.current = arr[arrIndex];
        setQuestions(arr);
        setFormShown(false);

        if(mode === "edit") {
            setPending(true);
            const formData = new FormData();
            formData.append('answer_a', item.answer_a);
            formData.append('answer_b', item.answer_b);
            formData.append('answer_c', item.answer_c);
            formData.append('answer_d', item.answer_d);
            formData.append('true_answer', item.true_answer);
            formData.append('quizz_id', id.toString());
            formData.append('question', item.question);

            fetch(`http://127.0.0.1:8000/api/question/edit/${item.id}`, {
                method: "POST",
                body: formData,
                headers: {
                    Authorization: `Bearer ${cookies.get('quizzapp_token')}`
                },
            })
                .then(res => res.json())
                .then(() => {
                    setPending(false);
                })
        }
    }

    const saveQuizz = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!cookies.get('quizzapp_token')) return;

        const data = new FormData(e.target as HTMLFormElement);
        data.append('username', cookies.get('quizzapp_username'));
        data.append('description', "quizz");
        setPending(true);

        if(mode === "edit") {
            fetch(`http://127.0.0.1:8000/api/quizz/edit/${id}`, {
                method: "POST",
                body: data,
                headers: {
                    Authorization: `Bearer ${cookies.get('quizzapp_token')}`
                },
            })
                .then(res => res.json())
                .then(() => {
                    setPending(false);
                    navigate('/?quizztoedit=1');
                })

        }

        let id1:number;

        // create quizz record
        if(mode === "create") {
            fetch(`http://127.0.0.1:8000/api/quizz/add`, {
                method: "POST",
                body: data,
                headers: {
                    Authorization: `Bearer ${cookies.get('quizzapp_token')}`
                },
            })
                .then(res => res.json())
                .then(data => {
                    id1 = data.id
                })
                .then(() => {
                    for(let i=0; i<questions.length; i++) {
                        const formData = new FormData();
                        formData.append('answer_a', questions[i].answer_a);
                        formData.append('answer_b', questions[i].answer_b);
                        formData.append('answer_c', questions[i].answer_c);
                        formData.append('answer_d', questions[i].answer_d);
                        formData.append('true_answer', questions[i].true_answer);
                        formData.append('quizz_id', id1.toString());
                        formData.append('question', questions[i].question);

                        fetch(`http://127.0.0.1:8000/api/question/create`, {
                            method: "POST",
                            body: formData,
                            headers: {
                                Authorization: `Bearer ${cookies.get('quizzapp_token')}`
                            },
                        })
                            .then(res => res.json())
                            .then(data => console.log(data));
                    }

                    setPending(false);
                    navigate('/?quizztoedit=1');
                })
        }
    }

    const deleteQuizz = () => {
        if(!cookies.get('quizzapp_token')) return;

        const data = new FormData();
        data.append('username', cookies.get('quizzapp_username'));
        setPending(true);

        fetch(`http://127.0.0.1:8000/api/quizz/delete/${id}`,{
            method: "POST",
            body: data,
            headers: {
                Authorization: `Bearer ${cookies.get('quizzapp_token')}`
            },
        })
            .then(res => res.json())
            .then(() => {
                setPending(false);
                navigate('/?quizztoedit=1');
            })
    }

    const hideQuizz = () => {
        if(!cookies.get('quizzapp_token')) return;

        const data = new FormData();
        data.append('username', cookies.get('quizzapp_username'));
        setPending(true);

        fetch(`http://127.0.0.1:8000/api/quizz/hide/${id}`,{
            method: "POST",
            body: data,
            headers: {
                Authorization: `Bearer ${cookies.get('quizzapp_token')}`
            },
        })
            .then(res => res.json())
            .then(() => {
                setPending(false);
                navigate('/?quizztoedit=1');
            })
    }

    const showQuizz = () => {
        if(!cookies.get('quizzapp_token')) return;

        const data = new FormData();
        data.append('username', cookies.get('quizzapp_username'));
        setPending(true);

        fetch(`http://127.0.0.1:8000/api/quizz/show/${id}`,{
            method: "POST",
            body: data,
            headers: {
                Authorization: `Bearer ${cookies.get('quizzapp_token')}`
            },
        })
            .then(res => res.json())
            .then(() => {
                setPending(false);
                navigate('/?quizztoedit=1');
            })
    }

    useEffect(() => {
        if(!searchParams.get('mode') || !cookies.get('quizzapp_token')) {
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

            fetch(`http://127.0.0.1:8000/api/quizz/id/${searchParams.get("id")}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data.result[0])
                    setTitle(data.result[0].title)
                    setHidden(data.result[0].hidden)
                })
                .then(() => {
                    fetch(`http://127.0.0.1:8000/api/question/all/${searchParams.get("id")}`)
                        .then(res => res.json())
                        .then(data => {
                            console.log(data.result);
                            setQuestions(data.result);
                        })
                })
        }

    }, []);

    return (
        <>
            {
                pending && <Loader />
            }
            {
                !pending &&
                <>
                    {
                        formShown &&
                        <EditorForm
                            id={id}
                            index={index}
                            addQuestion={addQuestion}
                            editQuestion={editQuestion}
                            editIndex={editIndex}
                            editData={editRef.current}
                            formMode={formMode}
                        />
                    }
                    <main
                        className="side-anim theme-rose w-[100vw] h-[100vh] flex flex-col lg:flex-row justify-evenly items-center">
                        <Card className="lg:w-[30%] w-[90%] lg:h-[80%] h-[38%]" id="titleSection">
                            <form onSubmit={saveQuizz} className="w-full h-full flex flex-col items-center justify-center gap-3 lg:gap-6">
                                <Input
                                    className="w-[90%] lg:text-xl text-base text-center"
                                    placeholder="title"
                                    name="title"
                                    required
                                    defaultValue={title}
                                />
                                <p className="lg:text-xl text-base font-semibold">Questions count : 0</p>
                                <Button size="sm" className="max-w-[90%] w-3/5 text-sm lg:text-lg">Save Quizz</Button>
                                {
                                    mode === "edit" && <>
                                        <Button onClick={hidden ? showQuizz : hideQuizz} size="sm" className="max-w-[90%] w-3/5 text-sm lg:text-lg">{ hidden ? "Show" : "Hide" } Quizz</Button>
                                        <Button onClick={deleteQuizz} size="sm" className="max-w-[90%] w-3/5 text-sm lg:text-lg">Delete Quizz</Button>
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
                            {
                                questions.map(item => (
                                    <Button id={item.id.toString()} variant="secondary" className="flex justify-between p-2 w-[90%] lg:w-4/5 text-xl">
                                        <span className="text-base lg:text-lg">{ item.question }</span>
                                        <section className="flex gap-3">
                                            <Button onClick={() => {
                                                setFormMode("edit");
                                                setEditIndex(item.id)
                                                setFormShown(true);
                                                editRef.current = item;
                                            }} className="h-[70%]">Edit</Button>
                                            <Button
                                                id={item.id.toString()}
                                                onClick={() => deleteQuestion(item.id)}
                                                className="h-[70%]"
                                                variant="destructive">Delete</Button>
                                        </section>
                                    </Button>
                                ))
                            }
                            <Button
                                onClick={() => {
                                    setFormShown(prev => !prev);
                                    setFormMode("create");
                                }}
                                className="w-4/5 text-xl">
                                +
                            </Button>
                        </Card>
                    </main>
                </>
            }
        </>
    )
}