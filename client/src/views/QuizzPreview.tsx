import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from "react-router-dom";

// components
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';

export default function QuizzPreview() {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        if(!searchParams.get("id")) {
            navigate('/');
            return;
        }
    }, []);

    return (
        <main className="theme-rose w-[100vw] h-[100vh] flex justify-center items-center">
            <Card className="w-4/5 h-2/3 side-anim">
                <CardHeader>
                    <CardTitle className="text-xl md:text-4xl">
                        Test 1
                    </CardTitle>
                </CardHeader>
                <Separator />
                <CardContent>
                    <CardDescription className="mt-6 mb-6 text-xs md:text-xl max-w-[100%] lg:max-w-[60%]">
                        Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit.
                        Sed tempus purus at sem lobortis, et finibus eros aliquet.
                        Nunc condimentum consectetur placerat.
                        Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
                        Aenean sagittis, ex et egestas feugiat, augue ligula sagittis risus,
                        a dignissim ante urna in est. Donec tincidunt dignissim lobortis.
                    </CardDescription>
                    <section id="rating">
                        <h2 className="text-lg md:text-3xl mb-4">
                            Rate Quizz:
                        </h2>
                        <div id="buttons" className="mb-4">
                            <Button className="rounded-full w-[1.5rem] h-[2rem] mr-2"></Button>
                            <Button className="rounded-full w-[1.5rem] h-[2rem] mr-2"></Button>
                            <Button className="rounded-full w-[1.5rem] h-[2rem] mr-2"></Button>
                            <Button className="rounded-full w-[1.5rem] h-[2rem] mr-2"></Button>
                            <Button className="rounded-full w-[1.5rem] h-[2rem] mr-2"></Button>
                        </div>
                    </section>
                    <Button>Start Quizz</Button>
                </CardContent>
            </Card>
        </main>
    )
}