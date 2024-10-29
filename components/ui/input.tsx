import * as React from 'react';

import { cn } from '@/lib/utils';
import { Label } from './label';

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    classNames?: {
        container?: string;
        input?: string;
        label?: string;
        error?: string;
    };
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, className, classNames, type, ...props }, ref) => {
        return (
            <div className={classNames?.container}>
                {label ? (
                    <Label
                        htmlFor={props.id}
                        className={cn(
                            'text-xs mb-1 inline-block',
                            classNames?.label,
                        )}
                    >
                        {label}
                    </Label>
                ) : null}
                <input
                    type={type}
                    className={cn(
                        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                        classNames?.input,
                        className,
                    )}
                    ref={ref}
                    {...props}
                />
                {error ? (
                    <span
                        className={cn(
                            'inline-block text-xs text-destructive mt-1',
                            classNames?.error,
                        )}
                    >
                        {error}
                    </span>
                ) : null}
            </div>
        );
    },
);
Input.displayName = 'Input';

export { Input };
