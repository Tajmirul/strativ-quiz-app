'use client';

import { signIn, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { object, string } from 'yup';
import { useFormik } from 'formik';
import { getFormikProps } from '@/lib/formik';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { UserRole } from '@/types';
import LoginCredentials from '@/components/LoginCredentials';

const initialValues = {
    email: '',
    password: '',
};

const validationSchema = object().shape({
    email: string().email('Invalid email').required('Email is required'),
    password: string().required('Password is required'),
});

const SignIn = () => {
    const router = useRouter();
    const { update } = useSession();

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            const res = await signIn('credentials', {
                ...values,
                redirect: false,
            });

            if (!res?.ok) {
                toast.error('Invalid email or password');
                return;
            }

            const updatedSession = await update();

            if (updatedSession?.user.role === UserRole.Admin) {
                router.push('/admin');
                return;
            }

            router.push('/quiz');
        },
    });

    const handleUseCredentials = (email: string, password: string) => {
        formik.setFieldValue('email', email);
        formik.setFieldValue('password', password);
    };

    return (
        <form
            className="flex items-center justify-center min-h-screen bg-gray-100 py-10"
            onSubmit={formik.handleSubmit}
        >
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-xl font-bold">Sign In</CardTitle>
                    <CardDescription className="text-sm">
                        Sign in and start quiz
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <Input
                            label="Email"
                            type="text"
                            placeholder="email"
                            {...getFormikProps(formik, 'email')}
                        />
                        <Input
                            label="Password"
                            type="password"
                            placeholder="Password"
                            {...getFormikProps(formik, 'password')}
                        />
                        <Button
                            className="w-full"
                            type="submit"
                            disabled={formik.isSubmitting}
                        >
                            Sign In
                        </Button>
                    </div>

                    <LoginCredentials setData={handleUseCredentials} />
                </CardContent>
            </Card>
        </form>
    );
};

export default SignIn;
