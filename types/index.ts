export enum UserRole {
    Admin = 'admin',
    User = 'user',
}

export interface IUser {
    id: number;
    name: string;
    email: string;
    password: string;
    role: UserRole;
}

export interface IQuestion {
    id: string;
    text: string;
    type: 'single' | 'multiple';
    options: string[];
    correctAnswers: string[];
}

export interface IAnswerItem {
    id: string;
    answer: string[];
    timestamp: string;
}

export interface IAnswer {
    [questionId: string]: IAnswerItem[];
}

export interface IAnswerInput
    extends Omit<IAnswer, 'id' | 'userId' | 'timestamp'> {}

export interface IStatistics {
    totalQuestions: number;
    correct: number;
    wrong: number;
    score: number;
}
