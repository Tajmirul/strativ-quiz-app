'use client';
import {
    createContext,
    useContext,
    useReducer,
    ReactNode,
    useEffect,
} from 'react';
import { IAnswer, IAnswerItem } from '@/types';
import { StorageKey } from '@/lib/constants';

interface AnswerState {
    answers: IAnswer;
}

interface AnswerContextProps extends AnswerState {
    saveAnswer: (_answer: IAnswer) => void;
}

const initialAnswerState: AnswerState = {
    answers: {},
};

const AnswerContext = createContext<AnswerContextProps | undefined>(undefined);

const saveToLocalStorage = (answers: IAnswer) => {
    localStorage.setItem(StorageKey.Answers, JSON.stringify(answers));
};

interface IAction {
    type: string;
    payload: IAnswer;
}

const answerReducer = (state: AnswerState, action: IAction) => {
    switch (action.type) {
        case 'SAVE_ANSWER':
            const updatedAnswers = { ...state.answers };

            Object.entries(action.payload).forEach(
                ([questionId, selections]) => {
                    if (!updatedAnswers[questionId]?.length) {
                        updatedAnswers[questionId] = [];
                    }
                    updatedAnswers[questionId].push(...selections);
                },
            );

            saveToLocalStorage(updatedAnswers);
            return { answers: updatedAnswers };

        case 'LOAD_ANSWERS':
            return { answers: action.payload };

        default:
            return state;
    }
};

export const AnswerProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(answerReducer, initialAnswerState);

    useEffect(() => {
        loadAnswers(
            JSON.parse(localStorage.getItem(StorageKey.Answers) || '{}'),
        );
    }, []);

    const saveAnswer = (answer: IAnswer) => {
        dispatch({ type: 'SAVE_ANSWER', payload: answer });
    };

    const loadAnswers = (answers: IAnswer) => {
        dispatch({ type: 'LOAD_ANSWERS', payload: answers });
    };

    return (
        <AnswerContext.Provider value={{ ...state, saveAnswer }}>
            {children}
        </AnswerContext.Provider>
    );
};

export const useAnswers = () => {
    const context = useContext(AnswerContext);
    if (!context) {
        throw new Error('useAnswers must be used within an AnswerProvider');
    }
    return context;
};
