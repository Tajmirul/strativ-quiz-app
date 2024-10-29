import { getCurrentUser } from '@/lib/next-auth';
import { UserRole } from '@/types';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

const layout = async ({ children }: { children: ReactNode }) => {
    const user = await getCurrentUser();

    if (user?.role === UserRole.Admin) {
        redirect('/admin');
    }

    return <>{children}</>;
};

export default layout;
