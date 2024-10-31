'use client';

import { useRouter } from 'next/navigation';
import { IAnswer, IAnswerItem } from '@/types';
import QuestionCard from '@/components/question-card/QuestionCard';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { useFormik } from 'formik';
import { object } from 'yup';
import { StorageKey } from '@/lib/constants';
import { calculateStatistics } from '@/lib/question';
import { createId } from '@paralleldrive/cuid2';
import { useCallback } from 'react';
import { useQuestions } from '@/store/QuestionContext';
import { useAnswers } from '@/store/AnswerContext';
import { useSession } from 'next-auth/react';

const initialValues: {
    answers: {
        [key: string]: string[];
    };
} = {
    answers: {},
};

const validationSchema = object({
    answers: object().test(
        'answers-object',
        'At least answer one question',
        (value) => {
            // Check that 'answers' is an object and has at least one key
            return (
                value &&
                typeof value === 'object' &&
                Object.keys(value).length > 0
            );
        },
    ),
});

const QuizPage = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const { questions } = useQuestions();
    const { saveAnswer } = useAnswers();

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            try {
                const newAnswers: IAnswer = {};
                Object.entries(values.answers).forEach(
                    ([questionId, selections]) => {
                        newAnswers[questionId] = [];

                        const answerItems: IAnswerItem = {
                            id: createId(),
                            userId: session!.user.id,
                            answer: selections,
                            timestamp: new Date().toJSON(),
                        };

                        newAnswers[questionId].push(answerItems);
                    },
                );

                saveAnswer(newAnswers);

                const statistics = calculateStatistics(values.answers);

                localStorage.setItem(
                    StorageKey.Statistics,
                    JSON.stringify(statistics),
                );

                router.push('/quiz/result');
            } catch (error) {
                console.log(error);
                toast.error('Failed to save quiz');
            }
        },
    });

    const handleAnswerChange = useCallback(
        (questionId: string, selectedOptions: string[]) => {
            // could not understand why this is not working

            // formik.setFieldValue('answers', {
            //     ...formik.values.answers,
            //     [questionId]: selectedOptions,
            // });

            const answers = formik.values.answers;
            answers[questionId] = selectedOptions;

            formik.setFieldValue('answers', answers);
        },
        [formik],
    );

    return (
        <div className="container ">
            <div className="max-w-[600px] mx-auto">
                <h1 className="text-2xl font-bold mb-4">Quiz</h1>
                <form
                    onSubmit={formik.handleSubmit}
                    className="space-y-4 mb-10"
                >
                    {!questions.length ? (
                        <p className="text-muted-foreground">
                            No questions available. Please add questions to
                            start the quiz.
                        </p>
                    ) : (
                        questions.map((question) => (
                            <QuestionCard
                                key={question.id}
                                question={question}
                                showAnswerHistory={true}
                                selected={formik.values.answers[question.id]}
                                onChange={handleAnswerChange}
                            />
                        ))
                    )}

                    {formik.touched.answers && formik.errors.answers && (
                        <p className="text-rose-500 text-sm">
                            {formik.errors.answers as unknown as string}
                        </p>
                    )}

                    {questions.length > 0 && (
                        <Button type="submit" disabled={formik.isSubmitting}>
                            Submit Quiz
                        </Button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default QuizPage;
