import { IUser } from './index';

declare module 'next-auth' {
    interface Session {
        user: Omit<IUser, 'password'>;
    }
}
