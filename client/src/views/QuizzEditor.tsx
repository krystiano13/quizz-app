import React from 'react';

//components
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";

export default function QuizzEditor() {
    return (
        <main className="side-anim theme-rose w-[100vw] h-[100vh] flex justify-evenly items-center">
            <Card className="w-[30%] h-[80%]" id="titleSection">
                <form className="w-full h-full flex flex-col items-center justify-center gap-6">
                    <Input
                        className="w-[90%] text-xl text-center"
                        placeholder="title"
                        name="title"
                        required
                    />
                    <p className="text-xl font-semibold">Questions count : 0</p>
                    <Button className="max-w-[90%] w-3/5 text-lg">Save Quizz</Button>
                    <Button className="max-w-[90%] w-3/5 text-lg">Hide Quizz</Button>
                    <Button className="max-w-[90%] w-3/5 text-lg">Delete Quizz</Button>
                </form>
            </Card>
            <Card className="w-[60%] h-[80%]" id="questions">

            </Card>
        </main>
    )
}