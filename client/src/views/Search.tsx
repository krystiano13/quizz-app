//imports
import React, { useRef } from 'react';
import {NavigateFunction, useNavigate} from "react-router";

//components
import { Input } from "../components/ui/input";
import { Button } from '../components/ui/button';

export default function Search() {
    const navigate:NavigateFunction = useNavigate();
    const inputRef = useRef<HTMLInputElement>(null);
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const search:string = (inputRef.current as HTMLInputElement).value;
        navigate(`/?search=${search}`);
    }

    return (
        <main className="form-anim theme-rose w-[100vw] h-[100vh] flex justify-center items-center">
            <form onSubmit={handleSubmit} className="flex gap-1">
                <Input
                    ref={inputRef}
                    name="search"
                    required
                    type="text"
                    className="text-lg p-6"
                    placeholder="Search ..."
                />
                <Button className="text-lg p-6" type="submit">Submit</Button>
            </form>
        </main>
    )
}