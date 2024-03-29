import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import Cookies from 'universal-cookie';

// hooks
import { useToast } from "../components/ui/use-toast";

// components
import { Button } from "../components/ui/button";
import { Card } from '../components/ui/card';
import { Textarea } from '../components/ui/textarea';

const AboutEdit = () => {
    const cookies = new Cookies();
    const navigate = useNavigate();
    const { toast } = useToast();

    const [defaultValue, setDefaultValue] = useState<string>("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const data = new FormData(e.target as HTMLFormElement);
        data.append("username", cookies.get('quizzapp_username') as string);

        await fetch('http://127.0.0.1:8000/api/profile/edit', {
            method: "POST",
            headers: {
                Authorization: `Bearer ${cookies.get('quizzapp_token')}`
            },
            body: data
        })
            .then(res => res.json())
            .then(data => {
                if(data.status === true) {
                    navigate(`/profile?username=${cookies.get('quizzapp_username')}`);
                }
                else {
                    toast({
                        title: "Validation Error",
                        description: data.errors.about[0]
                    });
                }
            })
    }

    function getDefaultValue() {
        fetch(`http://127.0.0.1:8000/api/profile/about/${cookies.get('quizzapp_username')}`)
            .then(res => res.json())
            .then(data => {
                if(data.status) {
                    setDefaultValue(data.result[0].about);
                }
            })
    }

    useEffect(() => {
        if(!cookies.get("quizzapp_username")) {
            navigate('/');
            return;
        }
        getDefaultValue();
    }, []);

    return (
        <main className="form-anim theme-rose w-[100vw] h-[100vh] flex justify-center items-center">
            <Card className="bg-card w-[70%] md:w-[35%] lg:w-[28%] xl:w-[22%]">
                <form onSubmit={handleSubmit} className="w-full pt-20 pb-20 pl-6 pr-6 flex flex-col items-center">
                    <Textarea defaultValue={defaultValue} name="about" className="mt-4 mb-4 w-[80%]" placeholder="Your about section ..."></Textarea>
                    <Button className="mt-4 mb-4 w-[80%]" type="submit">Edit</Button>
                </form>
            </Card>
        </main>
)
}

export default AboutEdit;