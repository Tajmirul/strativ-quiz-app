import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

const QuestionCardSkeleton = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <Skeleton className="h-4 w-4/6" />
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    <div className="flex gap-2">
                        <Skeleton className="size-5" />
                        <Skeleton className="w-[80px]" />
                    </div>
                    <div className="flex gap-2">
                        <Skeleton className="size-5" />
                        <Skeleton className="w-[80px]" />
                    </div>
                    <div className="flex gap-2">
                        <Skeleton className="size-5" />
                        <Skeleton className="w-[80px]" />
                    </div>
                    <div className="flex gap-2">
                        <Skeleton className="size-5" />
                        <Skeleton className="w-[80px]" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default QuestionCardSkeleton;
