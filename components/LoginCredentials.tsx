import React from 'react';

interface Props {
    setData: (_email: string, _password: string) => void;
}

const credentials = [
    {
        email: 'admin@gmail.com',
        password: 'Pa$$w0rd!',
    },
    {
        email: 'user1@gmail.com',
        password: 'Pa$$w0rd!',
    },
    {
        email: 'user2@gmail.com',
        password: 'Pa$$w0rd!',
    },
];

const LoginCredentials = ({ setData }: Props) => {
    return (
        <div className="mt-7 space-y-2">
            {credentials.map((credential, index) => (
                <div
                    className="flex border rounded-md overflow-hidden max-w-[420px]"
                    key={index}
                >
                    <input
                        name="email"
                        className="w-full text-xs px-4 py-2 outline-none"
                        value={credential.email}
                        readOnly
                    />
                    <input
                        name="password"
                        className="w-full text-xs px-2 py-2 outline-none"
                        value={credential.password}
                        readOnly
                    />
                    <button
                        className="copy-password text-xs px-4 py-2 bg-primary font-semibold text-primary-foreground"
                        type="button"
                        onClick={() =>
                            setData(credential.email, credential.password)
                        }
                    >
                        Use
                    </button>
                </div>
            ))}
        </div>
    );
};

export default LoginCredentials;
