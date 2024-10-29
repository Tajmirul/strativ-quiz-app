import React from 'react';
import { AlertCircle } from 'lucide-react';

const AccessDenied = () => {
    return (
        <div className="container">
            <div className="max-w-[500px] mx-auto flex flex-col items-center text-center">
                <AlertCircle className="h-20 w-20 text-rose-500" />

                <h1 className="text-xl mt-4 mb-2">Some thing went wrong!</h1>
                <p>
                    Please try again later. If the problem persists, please
                    contact support.
                </p>
                {/* <Button variant="outline" className="mt-4" onClick={reset}>
                    Try again
                </Button> */}
            </div>
        </div>
    );
};

export default AccessDenied;
