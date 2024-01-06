import React from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '../ui/card';

export function QuizzCard() {
    return (
        <Card className="flex flex-col justify-center w-[15rem] h-[15rem] cursor-pointer transition-colors hover:border-gray-300 box-border">
            <CardHeader>
                <CardTitle className="text-3xl mb-4">Quizz 1</CardTitle>
                <CardDescription className="text-lg mt-4">
                    Rate: 6.9
                </CardDescription>
            </CardHeader>
        </Card>
    )
}