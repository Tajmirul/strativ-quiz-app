import './globals.css';
import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { NextAuthProvider } from '@/components/NextAuthProvider';
import ContextProvider from '@/store/ContextProvider';

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
                    <ContextProvider>{children}</ContextProvider>
                    <Toaster position="bottom-center" />
                </NextAuthProvider>
            </body>
        </html>
    );
}
