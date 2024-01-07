import React from 'react';
import Cookies from "universal-cookie";


//hooks
import { useToast } from "../components/ui/use-toast";
import { useNavigate } from "react-router";

//components
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';

export default function Login() {
    const { toast } = useToast();
    const navigate = useNavigate();

    async function handleSubmit(e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const data = new FormData(e.target as HTMLFormElement);

        await fetch('http://127.0.0.1:8000/api/auth/login', {
            method: "POST",
            body: data
        })
            .then(res => res.json())
            .then(data => {
                if(!data.status) {
                    toast({
                        title: "Error",
                        description: "Wrong Credentials"
                    });
                }
                else {
                    const cookies = new Cookies();
                    const today = new Date();

                    cookies.set('quizzapp_token',data.token, {
                        expires: new Date(today.getTime() + 86400000)
                    });

                    cookies.set('quizzapp_username',data.name, {
                        expires: new Date(today.getTime() + 86400000)
                    });

                    navigate('/');
                }
            })
    }

    return (
        <main className="form-anim theme-rose w-[100vw] h-[100vh] flex justify-center items-center">
            <Card className="bg-card w-[70%] md:w-[35%] lg:w-[28%] xl:w-[22%]">
                <form onSubmit={handleSubmit} className="w-full pt-20 pb-20 pl-6 pr-6 flex flex-col items-center">
                    <Input className="mt-4 mb-4 w-[80%]" type="text" placeholder="username" name="name" required/>
                    <Input className="mt-4 mb-4 w-[80%]" type="password" placeholder="password" name="password" required/>
                    <Button className="mt-4 mb-4 w-[80%]" type="submit">Log In</Button>
                </form>
            </Card>
        </main>
    )
}