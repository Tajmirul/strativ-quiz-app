import React from 'react';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { IQuestion } from '@/types';

interface Props {
    question: IQuestion;
    selected?: string[];
    disabled?: boolean;
    onChange: (option: string, checked?: boolean) => void;
}

const QuestionCardOption = ({
    question,
    selected,
    disabled,
    onChange,
}: Props) => {
    return question.type === 'multiple' ? (
        <div className="space-y-3">
            {question.options.map((option, index) => (
                <div className="flex items-center space-x-2" key={index}>
                    <Checkbox
                        id={`${question.id}-${index}`}
                        checked={selected?.includes(option)}
                        disabled={disabled}
                        onCheckedChange={(checked: boolean) => {
                            onChange(option, checked);
                        }}
                    />
                    <Label htmlFor={`${question.id}-${index}`}>{option}</Label>
                </div>
            ))}
        </div>
    ) : (
        <RadioGroup
            value={selected?.[0]}
            disabled={disabled}
            className="space-y-3"
            onValueChange={onChange}
        >
            {question.options.map((option, index) => (
                <div className="flex items-center space-x-2" key={index}>
                    <RadioGroupItem
                        value={option}
                        id={`${question.id}-${index}`}
                    />
                    <Label htmlFor={`${question.id}-${index}`}>{option}</Label>
                </div>
            ))}
        </RadioGroup>
    );
};

export default QuestionCardOption;
