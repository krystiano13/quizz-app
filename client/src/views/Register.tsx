import React from 'react';
import {Card} from "../components/ui/card";
import {Input} from "../components/ui/input";
import {Button} from "../components/ui/button";

export default function Register() {
    return (
        <main className="theme-rose w-[100vw] h-[100vh] flex justify-center items-center">
            <Card className="bg-card sm:w-[70%] md:w-[30%] lg:w-[20%]">
                <form className="w-full pt-20 pb-20 pl-6 pr-6 flex flex-col items-center">
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