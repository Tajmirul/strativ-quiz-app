'use client';

import { useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { IQuestion } from '@/types';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { useFormik } from 'formik';
import { array, object, string } from 'yup';
import { getFormikProps } from '@/lib/formik';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setQuestion, useQuestions } from '@/store/features/questionSlice';

const initialValues: IQuestion = {
    id: '',
    text: '',
    type: 'single',
    options: [''],
    correctAnswers: [],
};

const validationSchema = object().shape({
    text: string().required('Question is required'),
    type: string().oneOf(['single', 'multiple'], 'Invalid question type'),
    options: array().of(string()).min(2, 'At least two options are required'),
    // if type is single, correctAnswers should have only one item
    // if type is multiple, correctAnswers should have at least one item
    correctAnswers: array().when('type', (type, schema) => {
        if (type[0] === 'single') {
            return schema.length(
                1,
                'Single choice question should have one correct answer',
            );
        } else {
            return schema.min(
                1,
                'Multiple choice question should have at least one correct answer',
            );
        }
    }),
});

const QuestionForm = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const searchParams = useSearchParams();
    const { questions } = useQuestions();

    const questionId = useMemo(
        () => searchParams.get('questionId'),
        [searchParams],
    );

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values, helpers) => {
            try {
                // if we mark an option as correct option then we change
                // the value of the option it keeps the previously selected
                // value in the correct options array.
                // this will cause failure in quiz submission.
                // to solve this, we'll remove the items present in correct
                // options array but not in options array

                const correctAnswers = values.correctAnswers.filter((item) =>
                    values.options.includes(item),
                );

                dispatch(setQuestion({ ...values, correctAnswers }));
                toast.success('Successful');

                if (questionId) {
                    router.push('/admin');
                }

                helpers.resetForm();
            } catch (error) {
                toast.error('Failed to add question');
            }
        },
    });

    useEffect(() => {
        if (formik.values.type === 'single') {
            formik.setFieldValue('correctAnswers', []);
        }
    }, [formik.values.type]);

    useEffect(() => {
        if (!questionId) {
            return;
        }

        const question = questions.find((q) => q.id === questionId);
        if (question) formik.setValues(question);
    }, [questionId]);

    const handleAddOption = (index: number) => {
        const newOptions = [
            ...formik.values.options.slice(0, index + 1),
            '',
            ...formik.values.options.slice(index + 1),
        ];

        formik.setFieldValue('options', newOptions);
    };

    const handleDeleteOption = (index: number) => {
        if (formik.values.options.length === 1) return;

        const newOptions = formik.values.options.filter((_, i) => i !== index);
        formik.setFieldValue('options', newOptions);
    };

    const markCorrectAnswer = (option: string) => {
        if (formik.values.type === 'single') {
            formik.setFieldValue('correctAnswers', [option]);
        } else {
            const correctAnswers = formik.values.correctAnswers.includes(option)
                ? formik.values.correctAnswers.filter((a) => a !== option)
                : [...formik.values.correctAnswers, option];

            formik.setFieldValue('correctAnswers', correctAnswers);
        }
    };

    const handleCancelEdit = () => {
        formik.resetForm();
        router.replace('/admin');
    };

    return (
        <div className="mb-6 grow max-w-[400px]">
            <div className="flex justify-between">
                <h3 className="text-xl font-semibold">
                    {questionId ? 'Edit' : 'Add New'} Question
                </h3>

                {questionId && (
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCancelEdit}
                    >
                        Cancel
                    </Button>
                )}
            </div>
            <form onSubmit={formik.handleSubmit} className="space-y-4 mt-4">
                <Input
                    placeholder="Question text"
                    {...getFormikProps(formik, 'text')}
                />
                <div className="flex items-center space-x-2">
                    <RadioGroup
                        className="space-y-2 mb-4"
                        value={formik.values.type}
                        onValueChange={(value) =>
                            formik.setFieldValue('type', value)
                        }
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="single" id="single" />
                            <Label htmlFor="single">Single Choice</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="multiple" id="multiple" />
                            <Label htmlFor="multiple">Multiple Choice</Label>
                        </div>
                    </RadioGroup>
                </div>
                {formik.values.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        {formik.values.type === 'single' ? (
                            <RadioGroup
                                value={formik.values.correctAnswers[0]}
                                onValueChange={(value) =>
                                    markCorrectAnswer(value)
                                }
                            >
                                <RadioGroupItem
                                    value={option}
                                    id={`option-${index}`}
                                />
                            </RadioGroup>
                        ) : (
                            <Checkbox
                                id={`option-${index}`}
                                checked={formik.values.correctAnswers.includes(
                                    option,
                                )}
                                onClick={() => markCorrectAnswer(option)}
                            />
                        )}
                        <Input
                            classNames={{
                                container: 'grow',
                            }}
                            placeholder={`Option ${index + 1}`}
                            {...getFormikProps(formik, `options.${index}`)}
                        />
                        <div className="flex gap-1">
                            <Button
                                type="button"
                                variant={'outline'}
                                size="icon"
                                onClick={() => handleAddOption(index)}
                            >
                                <PlusIcon />
                            </Button>
                            <Button
                                type="button"
                                variant={'outline'}
                                size="icon"
                                className="text-destructive border-destructive"
                                onClick={() => handleDeleteOption(index)}
                            >
                                <MinusIcon />
                            </Button>
                        </div>
                    </div>
                ))}
                {formik.touched.correctAnswers &&
                    formik.errors.correctAnswers && (
                        <span
                            className={cn(
                                'block text-xs text-destructive mt-1',
                            )}
                        >
                            {formik.errors.correctAnswers}
                        </span>
                    )}

                <Button type="submit" disabled={formik.isSubmitting}>
                    Submit
                </Button>
            </form>
        </div>
    );
};

export default QuestionForm;
