import { StorageKey } from '@/lib/constants';
import { IAnswer } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState } from '..';

const saveToLocalStorage = (answers: IAnswer) => {
    localStorage.setItem(StorageKey.Answers, JSON.stringify(answers));
};

const initialState: { answers: IAnswer } = {
    answers: {},
};

const authSlice = createSlice({
    name: 'answers',
    initialState,
    reducers: {
        saveAnswer: (state, action: PayloadAction<IAnswer>) => {
            Object.entries(action.payload).forEach(
                ([questionId, selections]) => {
                    if (!state.answers[questionId]?.length) {
                        state.answers[questionId] = [];
                    }

                    state.answers[questionId].push(...selections);
                },
            );

            saveToLocalStorage(state.answers);
        },
    },
});

export const { saveAnswer } = authSlice.actions;
export const useAnswers = () => useSelector((state: RootState) => state.answer);
export default authSlice;
