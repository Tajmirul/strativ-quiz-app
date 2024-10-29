import { IAnswer, IQuestion, IUser, UserRole } from '@/types';

export const initialQuestionData: IQuestion[] = [
    {
        id: '1',
        text: 'What is the output of `console.log(typeof null)`?',
        type: 'single',
        options: ['object', 'null', 'undefined', 'boolean'],
        correctAnswers: ['object'],
    },
    {
        id: '2',
        text: 'Which method is used to merge arrays in JavaScript?',
        type: 'single',
        options: ['concat', 'push', 'merge', 'append'],
        correctAnswers: ['concat'],
    },
    {
        id: '3',
        text: 'What will the following code output? `console.log(1 + "2" + "2")`',
        type: 'single',
        options: ['32', '122', '3', '12'],
        correctAnswers: ['122'],
    },
    {
        id: '4',
        text: 'Which of these keywords are used to declare a variable in JavaScript?',
        type: 'multiple',
        options: ['let', 'define', 'const', 'declare'],
        correctAnswers: ['let', 'const'],
    },
    {
        id: '5',
        text: 'Which of the following are falsy values in JavaScript?',
        type: 'multiple',
        options: ['0', 'false', 'NaN', 'null', '"0"'],
        correctAnswers: ['0', 'false', 'NaN', 'null'],
    },
];

export const initialUserData: IUser[] = [
    {
        id: 1,
        name: 'John Doe',
        email: 'admin@gmail.com',
        password: 'Pa$$w0rd!',
        role: UserRole.Admin,
    },
    {
        id: 2,
        name: 'Tajmirul',
        email: 'user@gmail.com',
        password: 'Pa$$w0rd!',
        role: UserRole.User,
    },
];

export const initialAnswerData: IAnswer = {};
