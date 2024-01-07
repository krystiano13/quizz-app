import React, { useState } from 'react';
import {Card} from "../components/ui/card";
import {Input} from "../components/ui/input";
import {Button} from "../components/ui/button";
import { useToast } from "../components/ui/use-toast";

export default function Register() {
    const { toast }  = useToast();
    async function handleSubmit(e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const data = new FormData(e.target as HTMLFormElement);

        await fetch('http://127.0.0.1:8000/api/auth/register', {
            method: "POST",
            body: data
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
               if(!data.status) {
                   toast({
                       title: "Couldn't create an account",
                       description: "Validation error"
                   });
               }
            })
    }

    return (
        <main className="form-anim theme-rose w-[100vw] h-[100vh] flex justify-center items-center">
            <Card className="bg-card w-[70%] sm:w-[70%] md:w-[35%] lg:w-[28%] xl:w-[22%] 2xl:w-[20%]">
                <form onSubmit={handleSubmit} className="w-full pt-20 pb-20 pl-6 pr-6 flex flex-col items-center">
                    <Input className="mt-4 mb-4 w-[80%]" type="text" placeholder="username" name="name" required/>
                    <Input className="mt-4 mb-4 w-[80%]" type="email" placeholder="email" name="email" required />
                    <Input className="mt-4 mb-4 w-[80%]" type="password" placeholder="password" name="password"
                           required/>
                    <Input className="mt-4 mb-4 w-[80%]" type="password" placeholder="repeat password" name="password_confirmation"
                           required/>
                    <Button className="mt-4 mb-4 w-[80%]" type="submit">Log In</Button>
                </form>
            </Card>
        </main>
    )
}