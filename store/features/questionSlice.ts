import { StorageKey } from '@/lib/constants';
import { IQuestion } from '@/types';
import { createId } from '@paralleldrive/cuid2';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState } from '..';

const saveToLocalStorage = (questions: IQuestion[]) => {
    localStorage.setItem(StorageKey.Questions, JSON.stringify(questions));
};

const initialState: { questions: IQuestion[] } = {
    questions: [],
};

const questionSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        setQuestions: (state, action: PayloadAction<IQuestion[]>) => {
            state.questions = action.payload;
            saveToLocalStorage(action.payload);
        },
        setQuestion: (state, action: PayloadAction<IQuestion>) => {
            const index = state.questions.findIndex(
                (q) => q.id === action.payload.id,
            );

            if (index === -1) {
                state.questions.push({
                    ...action.payload,
                    id: createId(),
                });
            } else {
                state.questions[index] = action.payload;
            }

            saveToLocalStorage(state.questions);
        },

        deleteQuestion: (state, action: PayloadAction<string>) => {
            const index = state.questions.findIndex(
                (q) => q.id === action.payload,
            );

            if (index === -1) {
                throw new Error('Question not found');
            }

            state.questions.splice(index, 1);
            saveToLocalStorage(state.questions);
        },
    },
});

export const { setQuestions, setQuestion, deleteQuestion } =
    questionSlice.actions;
export const useQuestions = () =>
    useSelector((state: RootState) => state.question);
export default questionSlice;
