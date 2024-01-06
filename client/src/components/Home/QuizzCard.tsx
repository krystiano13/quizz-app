import React from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '../ui/card';

interface Props {
    title: string,
    rate: number
}

export const QuizzCard:React.FC<Props> = ({ title, rate }) => {
    return (
        <Card className="flex flex-col justify-center w-[15rem] h-[15rem] cursor-pointer transition-colors hover:border-gray-300 box-border">
            <CardHeader>
                <CardTitle className="text-3xl mb-4">{ title }</CardTitle>
                <CardDescription className="text-lg mt-4">
                    Rate: { rate }
                </CardDescription>
            </CardHeader>
        </Card>
    )
}