import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import questionSlice from './features/questionSlice';
import authSlice from './features/answerSlice';

export const store = configureStore({
    reducer: {
        question: questionSlice.reducer,
        answer: authSlice.reducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
