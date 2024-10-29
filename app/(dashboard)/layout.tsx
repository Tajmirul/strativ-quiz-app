import AccessDenied from '@/components/AccessDenied';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { getCurrentUser } from '@/lib/next-auth';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

const layout = async ({ children }: { children: ReactNode }) => {
    const user = await getCurrentUser();

    if (!user) {
        redirect('/');
    }

    return (
        <>
            <Navbar />
            <main className="min-h-[calc(100vh-160px)]">{children}</main>
            <Footer />
        </>
    );
};

export default layout;
