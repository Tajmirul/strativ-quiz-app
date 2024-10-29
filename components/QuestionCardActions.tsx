import React from 'react';
import { Button } from './ui/button';

interface Props {
    onEditQuestion: () => void;
    onDeleteQuestion: () => void;
}

const QuestionCardActions = ({ onEditQuestion, onDeleteQuestion }: Props) => {
    return (
        <div className="mt-4 space-x-2">
            <Button size="sm" variant="outline" onClick={onEditQuestion}>
                Edit
            </Button>
            <Button size="sm" variant="destructive" onClick={onDeleteQuestion}>
                Delete
            </Button>
        </div>
    );
};

export default QuestionCardActions;
