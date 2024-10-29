'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IAnswerItem, IQuestion } from '@/types';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { memo, useEffect, useState } from 'react';
import { useAnswers } from '@/store/features/answerSlice';
import { deleteQuestion } from '@/store/features/questionSlice';
import { useDispatch } from 'react-redux';
import QuestionCardActions from './QuestionCardActions';
import AnswerHistory from '../AnswerHistory';
import QuestionCardOption from './QuestionCardOption';

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
        const { answers } = useAnswers();
        const dispatch = useDispatch();
        const router = useRouter();
        const [answerHistory, setAnswersHistory] = useState<IAnswerItem[]>([]);

        useEffect(() => {
            if (!showAnswerHistory) return;

            setAnswersHistory(answers[question.id] || []);
        }, []);

        const handleOptionChange = (option: string, checked?: boolean) => {
            if (!onChange) {
                return;
            }

            console.log({ option, checked });

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
                                router.push(`/admin?questionId=${question.id}`);
                            }}
                            onDeleteQuestion={() => {
                                dispatch(deleteQuestion(question.id));
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
