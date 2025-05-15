import React from 'react';
import { Button } from "@/components/ui/button";
import { FileText, User } from 'lucide-react';
import Link from 'next/link';
import { NAV_LINKS } from '@/lib/links';
const Navbar: React.FC = () => {
    return (
        <header className="border-b border-border flex fixed top-0 left-0 w-full z-10 backdrop-blur-sm">
            <div className="container mx-auto flex items-center justify-between py-4 px-4 lg:px-0">
                <div className="flex items-center">
                    <Link href="/" className="flex items-center gap-2 text-xl font-bold">
                        <FileText className="h-6 w-6" />
                        <span className="hidden sm:inline">חוזים</span>
                    </Link>
                </div>

                <nav className="flex items-center gap-4">
                    {NAV_LINKS.map((link) => (
                        <Link href={link.href} className="text-sm font-medium hover:text-primary" key={link.href}>
                            {link?.icon ? <Button variant="ghost" size="icon">
                                <link.icon className="h-4 w-4" />
                            </Button> : link.label}
                        </Link>
                    ))}
                    {/* <Link href="/dashboard" className="text-sm font-medium hover:text-primary">
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
                    </Button> */}
                </nav>
            </div>

        </header>
    );
};

export default Navbar;
