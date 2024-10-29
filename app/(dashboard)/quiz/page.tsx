'use client';

import { useRouter } from 'next/navigation';
import { IAnswer, IAnswerItem } from '@/types';
import QuestionCard from '@/components/question-card/QuestionCard';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { useFormik } from 'formik';
import { array, object } from 'yup';
import { StorageKey } from '@/lib/constants';
import { useDispatch } from 'react-redux';
import { saveAnswer } from '@/store/features/answerSlice';
import { calculateStatistics } from '@/lib/question';
import { useQuestions } from '@/store/features/questionSlice';
import { createId } from '@paralleldrive/cuid2';

const initialValues: {
    answers: {
        [key: string]: string[];
    };
} = {
    answers: {},
};

const validationSchema = object({
    questions: array().min(1, 'No questions found'),
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
    const dispatch = useDispatch();
    const { questions } = useQuestions();

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
                            answer: selections,
                            timestamp: new Date().toJSON(),
                        };

                        newAnswers[questionId].push(answerItems);
                    },
                );

                dispatch(saveAnswer(newAnswers));

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

    const handleAnswerChange = (
        questionId: string,
        selectedOptions: string[],
    ) => {
        const answers = formik.values.answers;
        answers[questionId] = selectedOptions;

        formik.setFieldValue('answers', answers);
    };

    return (
        <div className="container ">
            <div className="max-w-[600px] mx-auto">
                <h1 className="text-2xl font-bold mb-4">Quiz</h1>
                <form
                    onSubmit={formik.handleSubmit}
                    className="space-y-4 mb-10"
                >
                    {questions.map((question) => (
                        <QuestionCard
                            key={question.id}
                            question={question}
                            showAnswerHistory={true}
                            selected={formik.values.answers[question.id]}
                            onChange={handleAnswerChange}
                        />
                    ))}

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
