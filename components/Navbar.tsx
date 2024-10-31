'use client';
import React from 'react';
import { Button } from './ui/button';
import { LogOut } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { UserRole } from '@/types';

const Navbar = () => {
    const { data: session } = useSession();

    return (
        <nav className="container flex items-center justify-between py-3 mb-4 border-b sticky top-0 left-0 bg-background z-[1]">
            <div className="border-r-[20px] border-r-transparent border-l-[20px] border-l-transparent border-b-[30px] border-b-black"></div>

            <div className="flex gap-5 items-center">
                <div className="flex items-center gap-2">
                    <div className="size-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white"></div>
                    <p>{session?.user?.name}</p>
                </div>

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
