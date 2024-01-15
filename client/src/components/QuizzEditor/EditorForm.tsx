import React from 'react';

//components
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

export function EditorForm() {
    return (
        <div className="side-anim theme-rose fixed z-50 bg-black bg-opacity-40 w-[100vw] h-[100vh] flex items-center justify-center">
            <Card>
                <form>
                    <Textarea placeholder="question"></Textarea>
                    <section className="flex">
                        <Input placeholder="Answer A"/>
                        <Button>True</Button>
                    </section>
                    <section className="flex">
                        <Input placeholder="Answer B"/>
                        <Button>True</Button>
                    </section>
                    <section className="flex">
                        <Input placeholder="Answer C"/>
                        <Button>True</Button>
                    </section>
                    <section className="flex">
                        <Input placeholder="Answer D"/>
                        <Button>True</Button>
                    </section>
                    <Button>Save</Button>
                </form>
            </Card>
        </div>
    )
}