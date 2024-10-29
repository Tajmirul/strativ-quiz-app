'use client';

import { StorageKey } from '@/lib/constants';
import { initialQuestionData } from '@/lib/data';
import { saveAnswer } from '@/store/features/answerSlice';
import { setQuestions } from '@/store/features/questionSlice';
import { IAnswer, IQuestion } from '@/types';
import { useSession } from 'next-auth/react';
import React, { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';

const ReduxInit = ({ children }: { children: ReactNode }) => {
    const dispatch = useDispatch();
    const { data: session } = useSession();

    useEffect(() => {
        if (!session?.user) return;

        // Initialize redux store here
        const questions = JSON.parse(
            localStorage.getItem(StorageKey.Questions) || '[]',
        ) as IQuestion[];
        const answers = JSON.parse(
            localStorage.getItem(StorageKey.Answers) || '{}',
        ) as IAnswer;

        if (questions.length) {
            dispatch(setQuestions(questions));
        } else {
            dispatch(setQuestions(initialQuestionData));
        }

        dispatch(saveAnswer(answers));
    }, [session?.user.id]);

    return <>{children}</>;
};

export default ReduxInit;
