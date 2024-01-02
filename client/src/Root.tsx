import React from 'react';
import { Input } from "./components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./components/ui/card";
export function Root() {
    return (
        <>
            <Card>
                <h1 className="text-2xl text-center">Quiz App</h1>
                <Input/>
            </Card>
        </>
    )
}