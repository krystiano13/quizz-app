import React from 'react';

//components
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { EditorForm } from "../components/QuizzEditor/EditorForm";

export default function QuizzEditor() {
    return (
        <>
            <EditorForm />
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
                        <Button size="sm" className="max-w-[90%] w-3/5 text-sm lg:text-lg">Hide Quizz</Button>
                        <Button size="sm" className="max-w-[90%] w-3/5 text-sm lg:text-lg">Delete Quizz</Button>
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
                    <Button className="w-4/5 text-xl">+</Button>
                </Card>
            </main>
        </>
    )
}