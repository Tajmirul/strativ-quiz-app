'use client';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { StorageKey } from '@/lib/constants';
import { IStatistics } from '@/types';
import { redirect } from 'next/navigation';
import { useMemo } from 'react';

const Page = () => {
    const statistics = useMemo(() => {
        const result = JSON.parse(
            localStorage.getItem(StorageKey.Statistics) || 'null',
        ) as IStatistics;

        localStorage.removeItem(StorageKey.Statistics);

        return result;
    }, []);

    if (!statistics) {
        redirect('/quiz');
    }

    return (
        <div className="container">
            <Card className="mb-8 max-w-[500px] mx-auto">
                <CardHeader>
                    <CardTitle className="text-center">Quiz Results</CardTitle>
                    <CardDescription className="text-center">
                        Here&apos;s how you performed on the quiz
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                        <div className="text-center md:text-left mb-4 md:mb-0">
                            <p className="text-5xl font-bold text-primary">
                                {statistics.score.toFixed(1)}%
                            </p>
                            <p className="text-base text-muted-foreground">
                                Your Score
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <div className="text-center">
                                <p className="text-2xl font-semibold text-green-600">
                                    {statistics.correct}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Correct
                                </p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-semibold text-red-600">
                                    {statistics.wrong}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Incorrect
                                </p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-semibold">
                                    {statistics.totalQuestions}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Total
                                </p>
                            </div>
                        </div>
                    </div>
                    <Progress value={statistics.score} className="h-3 mb-2" />
                </CardContent>
            </Card>
        </div>
    );
};

export default Page;
