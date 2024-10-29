import { IQuestion, IStatistics } from '@/types';
import { StorageKey } from './constants';

export const calculateStatistics = (answers: {
    [questionId: string]: string[];
}) => {
    const questions = JSON.parse(
        localStorage.getItem(StorageKey.Questions) || '[]',
    ) as IQuestion[];

    const statistics: IStatistics = {
        totalQuestions: questions.length,
        correct: 0,
        wrong: 0,
        score: 0,
    };

    Object.entries(answers).forEach(([questionId, answer]) => {
        const question = questions.find((item) => item.id === questionId);

        if (!question) return;

        const isCorrect =
            answer.length === question.correctAnswers.length &&
            answer.every((ans) => question.correctAnswers.includes(ans));

        if (isCorrect) {
            statistics.correct += 1;
        } else {
            statistics.wrong += 1;
        }
    });

    statistics.score = (statistics.correct / statistics.totalQuestions) * 100;

    return statistics;
};
