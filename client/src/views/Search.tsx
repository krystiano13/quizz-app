import React from 'react';
import { Input } from "../components/ui/input";
import { Button } from '../components/ui/button';

export default function Search() {
    return (
        <main className="form-anim theme-rose w-[100vw] h-[100vh] flex justify-center items-center">
            <form className="flex gap-1">
                <Input className="text-lg p-6" placeholder="Search ..." />
                <Button className="text-lg p-6" type="submit">Submit</Button>
            </form>
        </main>
    )
}