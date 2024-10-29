import { initialUserData } from '@/lib/data';
import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: AuthOptions = {
    session: {
        strategy: 'jwt',
    },
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { type: 'email' },
                password: { type: 'password' },
            },
            authorize: async (credentials) => {
                const matchedUser = initialUserData.find(
                    (user) => user.email === credentials?.email,
                );

                if (!matchedUser) {
                    return null;
                }

                if (credentials?.password === matchedUser.password) {
                    return {
                        id: matchedUser.id.toString(),
                    };
                }

                return null;
            },
        }),
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.id = user.id;
            }

            return token;
        },
        session: async ({ session, token }) => {
            const user = initialUserData.find(
                (user) => user.id.toString() === token.id,
            );

            session.user = {
                id: user!.id,
                name: user!.name,
                email: user!.email,
                role: user!.role,
            };

            return session;
        },
    },
};
