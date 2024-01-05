import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription, CardContent
}
    from '../components/ui/card';

export default function Profile() {
    return (
        <main className="form-anim theme-rose w-[100vw] h-[100vh] flex justify-center items-center">
            <Card className="p-6 flex flex-col w-[75%] md:w-[45%] lg:w-[35%] xl:w-[30%]">
                <Avatar className="ml-3">
                    <AvatarFallback>Ad</AvatarFallback>
                </Avatar>
                <CardHeader>
                    <CardTitle>Admin</CardTitle>
                    <CardDescription>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et felis lacus. Duis et mollis augue. Nam scelerisque ultrices ligula. Fusce congue condimentum nisl. Curabitur commodo eleifend risus sed vestibulum.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ul>
                        <li>Quizzes Made: 12</li>
                        <li>Quizzes Solved: 40</li>
                        <li>Quizzes Rated: 25</li>
                        <li>Average Quizzes Ratings: 4.23</li>
                    </ul>
                </CardContent>
            </Card>
        </main>
    )
}