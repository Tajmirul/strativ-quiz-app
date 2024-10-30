'use client';
import QuestionCard from '@/components/question-card/QuestionCard';
import QuestionForm from '../../../components/question-form/QuestionForm';
import { Button } from '@/components/ui/button';
import { initialQuestionData } from '@/lib/data';
import { setQuestions, useQuestions } from '@/store/features/questionSlice';
import { useDispatch } from 'react-redux';

const AdminPage = () => {
    const dispatch = useDispatch();
    const { questions } = useQuestions();

    const handlePopulateQuestions = () => {
        dispatch(setQuestions(initialQuestionData));
    };

    return (
        <div className="container">
            <div className="flex max-md:flex-col gap-x-5">
                <div className="space-y-4 w-full max-w-[600px] max-md:order-1 max-md:border-t max-md:pt-5">
                    <h1 className="text-xl font-semibold mb-4">Questions</h1>

                    {!questions.length ? (
                        <div className="text-center">
                            <p className="text-muted-foreground mb-4">
                                No questions found
                            </p>
                            <Button
                                onClick={handlePopulateQuestions}
                                variant="outline"
                            >
                                Populate Questions
                            </Button>
                        </div>
                    ) : (
                        questions.map((question) => (
                            <QuestionCard
                                key={question.id}
                                disabled
                                actionEnabled
                                question={question}
                                selected={question.correctAnswers}
                            />
                        ))
                    )}
                </div>

                <QuestionForm />
            </div>
        </div>
    );
};

export default AdminPage;
