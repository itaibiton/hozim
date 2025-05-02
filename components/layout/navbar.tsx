
import React from 'react';
import { Button } from "@/components/ui/button";
import { FileText, User } from 'lucide-react';
import Link from 'next/link';

const Navbar: React.FC = () => {
    return (
        <header className="border-b border-border flex w-full px-12  py-4 justify-between">
            <div className="flex items-center">
                <Link href="/" className="flex items-center gap-2 text-xl font-bold">
                    <FileText className="h-6 w-6" />
                    <span className="hidden sm:inline">חוזים</span>
                </Link>
            </div>

            <nav className="flex items-center gap-4">
                <Link href="/" className="text-sm font-medium hover:text-primary">
                    דף הבית
                </Link>
                <Link href="/dashboard" className="text-sm font-medium hover:text-primary">
                    החוזים שלי
                </Link>
                <Button variant="outline" size="sm" asChild>
                    <Link href="/contracts/create">
                        יצירת חוזה חדש
                    </Link>
                </Button>
                <Button variant="outline" size="icon" asChild>
                    <Link href="/dashboard">
                        <User className="h-4 w-4" />
                        <span className="sr-only">החשבון שלי</span>
                    </Link>
                </Button>
            </nav>
        </header>
    );
};

export default Navbar;
