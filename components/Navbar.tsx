'use client';
import React from 'react';
import { Button } from './ui/button';
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

const Navbar = () => {
    return (
        <nav className="container flex items-center justify-between py-3 mb-4">
            <div className="border-r-[20px] border-r-transparent border-l-[20px] border-l-transparent border-b-[30px] border-b-black"></div>

            <div className="">
                <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => signOut()}
                >
                    <LogOut />
                </Button>
            </div>
        </nav>
    );
};

export default Navbar;
