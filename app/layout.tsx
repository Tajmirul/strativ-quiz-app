import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { NextAuthProvider } from '@/components/NextAuthProvider';
import './globals.css';
import ReduxProvider from '@/components/ReduxProvider';
import ReduxInit from '@/components/ReduxInit';

const openSans = Open_Sans({
    style: 'normal',
    subsets: ['latin'],
    variable: '--font-open-sans',
    weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
    title: 'Quiz App',
    description: 'A simple quiz application',
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${openSans.variable} antialiased`}>
                <NextAuthProvider>
                    <ReduxProvider>
                        <ReduxInit>{children}</ReduxInit>
                    </ReduxProvider>
                    <Toaster position="bottom-center" />
                </NextAuthProvider>
            </body>
        </html>
    );
}
