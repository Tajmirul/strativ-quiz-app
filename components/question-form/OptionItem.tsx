'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { useFormik } from 'formik';
import { getFormikProps } from '@/lib/formik';
import { IQuestion } from '@/types';

interface Props {
    index: number;
    formik: ReturnType<typeof useFormik<IQuestion>>;
    option: string;

    handleAddOption: (index: number) => void;
    handleDeleteOption: (index: number) => void;
}

const OptionItem = ({
    index,
    option,
    formik,

    handleAddOption,
    handleDeleteOption,
}: Props) => {
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

    return (
        <div className="flex items-center space-x-2">
            {formik.values.type === 'single' ? (
                <RadioGroup
                    value={formik.values.correctAnswers[0]}
                    onValueChange={(value) => markCorrectAnswer(value)}
                    disabled={option.length === 0}
                >
                    <RadioGroupItem value={option} id={`option-${index}`} />
                </RadioGroup>
            ) : (
                <Checkbox
                    id={`option-${index}`}
                    checked={formik.values.correctAnswers.includes(option)}
                    onClick={() => markCorrectAnswer(option)}
                    disabled={option.length === 0}
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
    );
};

export default OptionItem;
