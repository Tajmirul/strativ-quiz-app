import { UserRole } from '@/types';
import { getCurrentUser } from './next-auth';

export const authCheck = async (requiredRole: UserRole) => {
    const user = await getCurrentUser();

    if (user?.role !== requiredRole) {
        throw new Error('You are not authorized to perform this action');
    }
};
