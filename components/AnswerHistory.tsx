import React from 'react';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from './ui/accordion';
import { IAnswerItem } from '@/types';

interface Props {
    history: IAnswerItem[];
}

const AnswerHistory = ({ history }: Props) => {
    return (
        <Accordion type="single" collapsible className="mt-4">
            <AccordionItem value="answer-history">
                <AccordionTrigger className="text-sm">
                    View Answer History
                </AccordionTrigger>
                <AccordionContent>
                    <ul className="space-y-2">
                        {history.map((answer, index) => (
                            <li key={index} className="bg-gray-100 p-2 rounded">
                                <p>{answer.answer.join(', ')}</p>
                                <p className="text-sm text-gray-500">
                                    Submitted:{' '}
                                    {new Date(
                                        answer.timestamp,
                                    ).toLocaleString()}
                                </p>
                            </li>
                        ))}
                    </ul>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

export default AnswerHistory;
