import React, { useState } from 'react';

//components
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

export function EditorForm() {
    const [trueAnswer, setTrueAnswer] = useState<string>("a");
    return (
        <div className="side-anim theme-rose fixed z-50 bg-black bg-opacity-60 w-[100vw] h-[100vh] flex items-center justify-center">
            <Card className="p-8 w-[85%] lg:w-[40%]">
                <form className="flex flex-col items-center gap-4 w-full">
                    <Textarea required className="max-h-[10rem]" placeholder="question"></Textarea>
                    <section className="flex w-full">
                        <Input required placeholder="Answer A"/>
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
                        <Input required placeholder="Answer B"/>
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
                        <Input required placeholder="Answer C"/>
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
                        <Input required placeholder="Answer D"/>
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