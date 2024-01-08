import React , { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from "react-router-dom";

// components
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription, CardContent
}
from '../components/ui/card';

interface UserInfo {
    id: number;
    name: string;
    about: string;
    created_at: string;
    updated_at: string;
    quizzes_made: number;
    quizzes_rated: number;
    quizzes_solved: number;
    average_rating: number;
}

const Profile = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState<UserInfo[]>([]);
    function getProfileInfo() {
        if(!searchParams.get('username')) {
            navigate('/');
            return;
        }

        fetch(`http://127.0.0.1:8000/api/profile/${searchParams.get('username')}`)
            .then(res => res.json())
            .then((data) => {
                if(data.result.length < 1) {
                    navigate('/');
                    return;
                }
                setUserInfo([{
                    id: data.result[0].id,
                    name: data.result[0].name,
                    about: data.result[0].about,
                    created_at: data.result[0].created_at,
                    updated_at: data.result[0].updated_at,
                    quizzes_made: data.result[0].quizzes_made,
                    quizzes_rated: data.result[0].quizzes_rated,
                    quizzes_solved: data.result[0].quizzes_solved,
                    average_rating: data.result[0].average_rating
                }]);
            })
    }

    useEffect(() => {
        getProfileInfo();
    }, []);

    return (
        <main className="form-anim theme-rose w-[100vw] h-[100vh] flex justify-center items-center">
            <Card className="p-6 flex flex-col w-[75%] md:w-[45%] lg:w-[35%] xl:w-[30%]">
                <Avatar className="ml-3">
                    <AvatarFallback>
                        { userInfo[0].name[0].toUpperCase() + userInfo[0].name[1] }
                    </AvatarFallback>
                </Avatar>
                <CardHeader>
                    <CardTitle>{ userInfo[0].name }</CardTitle>
                    <CardDescription>
                        { userInfo[0].about }
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ul>
                        <li>Quizzes Made: { userInfo[0].quizzes_made }</li>
                        <li>Quizzes Solved: { userInfo[0].quizzes_solved }</li>
                        <li>Quizzes Rated: { userInfo[0].quizzes_rated }</li>
                        <li>Average Quizzes Ratings: { userInfo[0].average_rating }</li>
                    </ul>
                </CardContent>
            </Card>
        </main>
    )
}

export default Profile;