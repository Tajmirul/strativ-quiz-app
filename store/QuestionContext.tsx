'use client';
import React, {
    createContext,
    useContext,
    useReducer,
    ReactNode,
    useEffect,
} from 'react';
import { IQuestion } from '@/types';
import { StorageKey } from '@/lib/constants';
import { createId } from '@paralleldrive/cuid2';

interface QuestionState {
    questions: IQuestion[];
}

interface QuestionContextProps extends QuestionState {
    setQuestions: (questions: IQuestion[]) => void;
    setQuestion: (question: IQuestion) => void;
    deleteQuestion: (id: string) => void;
}

const initialQuestionState: QuestionState = {
    questions: [],
};

const QuestionContext = createContext<QuestionContextProps | undefined>(
    undefined,
);

const saveToLocalStorage = (questions: IQuestion[]) => {
    localStorage.setItem(StorageKey.Questions, JSON.stringify(questions));
};

const questionReducer = (state: QuestionState, action: any) => {
    switch (action.type) {
        case 'SET_QUESTIONS':
            saveToLocalStorage(action.payload);
            return { questions: action.payload };

        case 'SET_QUESTION':
            const existingIndex = state.questions.findIndex(
                (q) => q.id === action.payload.id,
            );
            const updatedQuestions =
                existingIndex === -1
                    ? [
                          ...state.questions,
                          { ...action.payload, id: createId() },
                      ]
                    : state.questions.map((q, i) =>
                          i === existingIndex ? action.payload : q,
                      );

            saveToLocalStorage(updatedQuestions);
            return { questions: updatedQuestions };

        case 'DELETE_QUESTION':
            const filteredQuestions = state.questions.filter(
                (q) => q.id !== action.payload,
            );
            saveToLocalStorage(filteredQuestions);
            return { questions: filteredQuestions };

        default:
            return state;
    }
};

export const QuestionProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(questionReducer, initialQuestionState);

    useEffect(() => {
        setQuestions(
            JSON.parse(localStorage.getItem(StorageKey.Questions) || '[]'),
        );
    }, []);

    const setQuestions = (questions: IQuestion[]) => {
        dispatch({ type: 'SET_QUESTIONS', payload: questions });
    };

    const setQuestion = (question: IQuestion) => {
        dispatch({ type: 'SET_QUESTION', payload: question });
    };

    const deleteQuestion = (id: string) => {
        dispatch({ type: 'DELETE_QUESTION', payload: id });
    };

    return (
        <QuestionContext.Provider
            value={{ ...state, setQuestions, setQuestion, deleteQuestion }}
        >
            {children}
        </QuestionContext.Provider>
    );
};

export const useQuestions = () => {
    const context = useContext(QuestionContext);
    if (!context) {
        throw new Error('useQuestions must be used within a QuestionProvider');
    }
    return context;
};
