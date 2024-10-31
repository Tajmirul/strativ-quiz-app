'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IAnswerItem, IQuestion } from '@/types';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { memo, useEffect, useState } from 'react';
import QuestionCardActions from './QuestionCardActions';
import AnswerHistory from '../AnswerHistory';
import QuestionCardOption from './QuestionCardOption';
import { useAnswers } from '@/store/AnswerContext';
import { useQuestions } from '@/store/QuestionContext';
import { useSession } from 'next-auth/react';

interface Props {
    question: IQuestion;
    selected?: string[];
    disabled?: boolean;
    actionEnabled?: boolean;
    showAnswerHistory?: boolean;

    onChange?: (_questionId: string, _selectedOptions: string[]) => void;
}

const QuestionCard = memo(
    ({
        question,
        selected,
        disabled = false,
        actionEnabled = false,
        showAnswerHistory = false,
        onChange,
    }: Props) => {
        const { data: session } = useSession();
        const { answers } = useAnswers();
        const router = useRouter();
        const { deleteQuestion } = useQuestions();
        const [answerHistory, setAnswersHistory] = useState<IAnswerItem[]>([]);

        useEffect(() => {
            if (!showAnswerHistory || !session?.user) return;

            const history = answers[question.id]?.filter(
                (item) => item.userId === session.user.id,
            );

            setAnswersHistory(history || []);
        }, [session?.user]);

        const handleOptionChange = (option: string, checked?: boolean) => {
            if (!onChange) {
                return;
            }

            if (question.type === 'single') {
                onChange(question.id, [option]);
            } else {
                const newSelected = !checked
                    ? selected?.filter((item) => item !== option)
                    : [...(selected || []), option];

                onChange(question.id, newSelected || []);
            }
        };

        return (
            <Card key={question.id}>
                <CardHeader>
                    <CardTitle className="text-base">{question.text}</CardTitle>
                </CardHeader>
                <CardContent>
                    <QuestionCardOption
                        question={question}
                        disabled={disabled}
                        selected={selected}
                        onChange={handleOptionChange}
                    />

                    {actionEnabled ? (
                        <QuestionCardActions
                            onEditQuestion={() => {
                                router.push(
                                    `/admin/questions?questionId=${question.id}`,
                                );
                            }}
                            onDeleteQuestion={() => {
                                deleteQuestion(question.id);
                                toast.success('Question deleted successfully');
                            }}
                        />
                    ) : null}

                    {showAnswerHistory && answerHistory.length ? (
                        <AnswerHistory history={answerHistory} />
                    ) : null}
                </CardContent>
            </Card>
        );
    },
    (prevProps, nextProps) => {
        return (
            prevProps.question.id === nextProps.question.id &&
            prevProps.selected === nextProps.selected
        );
    },
);

QuestionCard.displayName = 'QuestionCard';

export default QuestionCard;
