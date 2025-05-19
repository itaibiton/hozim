import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
    FileText,
    User,
    Menu,
    LogOut,
    Settings,
    PlusCircle,
    UserPlus,
} from 'lucide-react';
import Link from 'next/link';
import { NAV_LINKS } from '@/lib/links';
import { usePathname } from 'next/navigation';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from '@/lib/supabaseClient';
import AuthForm from '@/components/auth/AuthForm';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';

// Real authentication hook using Supabase
function useSupabaseAuth() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });
        // Get initial session
        supabase.auth.getSession().then(({ data }) => {
            setUser(data.session?.user ?? null);
            setLoading(false);
        });
        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

    const logout = async () => {
        await supabase.auth.signOut();
        setUser(null);
    };

    return { user, isAuthenticated: !!user, logout, loading };
}

const Navbar: React.FC = () => {
    const pathname = usePathname();
    const { isAuthenticated, user, logout, loading } = useSupabaseAuth();
    const [authOpen, setAuthOpen] = useState(false);

    return (
        <header className="border-b border-border flex fixed top-0 left-0 w-full z-10 backdrop-blur-sm bg-background/80 ">
            <div className="container mx-auto flex items-center justify-between py-3 px-4 lg:px-0">
                <div className="flex items-center">
                    <Link href="/" className="flex items-center gap-2 text-xl font-bold transition-all hover:text-primary">
                        <FileText className="h-6 w-6" />
                        <span className="hidden sm:inline">חוזים</span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-4">
                    {/* {NAV_LINKS.map((link) => (
                        <Link
                            href={link.href}
                            className={`text-sm font-medium transition-all hover:text-primary ${pathname === link.href ? "text-primary font-semibold" : ""
                                }`}
                            key={link.href}
                        >
                            {link?.icon ?
                                <Button
                                    variant={pathname === link.href ? "secondary" : "ghost"}
                                    size="icon"
                                    className="relative"
                                >
                                    <link.icon className="h-4 w-4" />
                                    {pathname === link.href && (
                                        <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                                    )}
                                </Button>
                                : link.label
                            }
                        </Link>
                    ))} */}

                    {isAuthenticated ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant={"ghost"}
                                    className="relative"
                                >
                                    שלום, {user?.email?.split('@')[0] || 'משתמש'}
                                    <User className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <div className="flex items-center justify-start gap-2 p-2">
                                    <div className="flex flex-col space-y-1 leading-none">
                                        <p className="font-medium">{user?.email}</p>
                                    </div>
                                </div>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href="/dashboard" className="w-full cursor-pointer">
                                        <User className="mr-2 h-4 w-4" />
                                        החוזים שלי
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/settings" className="w-full cursor-pointer">
                                        <Settings className="mr-2 h-4 w-4" />
                                        הגדרות
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={logout}
                                    className="text-destructive focus:text-destructive cursor-pointer"
                                >
                                    <LogOut className="mr-2 h-4 w-4" />
                                    התנתק
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Button variant="outline" onClick={() => setAuthOpen(true)}>
                                התחברות <UserPlus className="h-4 w-4" />
                            </Button>
                        </div>
                    )}
                </nav>

                {/* Mobile Navigation */}
                <div className="md:hidden flex items-center">
                    {isAuthenticated && (
                        <Button variant="ghost" className="relative h-8 w-8 rounded-full mr-2">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={user?.avatar_url} alt={user?.email} />
                                <AvatarFallback className="bg-primary/10 text-primary">
                                    {user?.email?.substring(0, 2) || "מש"}
                                </AvatarFallback>
                            </Avatar>
                        </Button>
                    )}

                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">פתח תפריט</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[80%] sm:w-[350px]">
                            <div className="flex flex-col h-full">
                                <div className="px-4 py-6 border-b">
                                    <div className="flex items-center justify-between mb-4">
                                        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
                                            <FileText className="h-6 w-6" />
                                            <span>חוזים</span>
                                        </Link>
                                    </div>

                                    {isAuthenticated ? (
                                        <div className="flex items-center gap-4 pt-4">
                                            <Avatar className="h-10 w-10">
                                                <AvatarImage src={user?.avatar_url} alt={user?.email} />
                                                <AvatarFallback className="bg-primary/10 text-primary">
                                                    {user?.email?.substring(0, 2) || "מש"}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-medium">{user?.email}</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col gap-2 pt-4">
                                            <Button className="w-full" onClick={() => setAuthOpen(true)}>
                                                הרשמה
                                            </Button>
                                            <Button variant="outline" className="w-full" onClick={() => setAuthOpen(true)}>
                                                כניסה
                                            </Button>
                                        </div>
                                    )}
                                </div>

                                <nav className="flex-1 overflow-auto py-6 px-4">
                                    <div className="flex flex-col gap-3">
                                        {NAV_LINKS.map((link) => (
                                            <Link
                                                href={link.href}
                                                className={`flex items-center py-2 px-3 text-sm font-medium rounded-md transition-all hover:bg-muted ${pathname === link.href ? "bg-muted text-primary font-semibold" : ""
                                                    }`}
                                                key={link.href}
                                            >
                                                {link?.icon && <link.icon className="h-4 w-4 ml-3" />}
                                                <span>{link.label}</span>
                                            </Link>
                                        ))}

                                        <Link
                                            href="/contracts/create"
                                            className="flex items-center py-2 px-3 text-sm font-medium rounded-md transition-all hover:bg-muted mt-2"
                                        >
                                            <PlusCircle className="h-4 w-4 ml-3" />
                                            <span>יצירת חוזה חדש</span>
                                        </Link>

                                        {isAuthenticated && (
                                            <>
                                                <Link
                                                    href="/dashboard"
                                                    className={`flex items-center py-2 px-3 text-sm font-medium rounded-md transition-all hover:bg-muted ${pathname === "/dashboard" ? "bg-muted text-primary font-semibold" : ""
                                                        }`}
                                                >
                                                    <User className="h-4 w-4 ml-3" />
                                                    <span>החוזים שלי</span>
                                                </Link>

                                                <Link
                                                    href="/settings"
                                                    className={`flex items-center py-2 px-3 text-sm font-medium rounded-md transition-all hover:bg-muted ${pathname === "/settings" ? "bg-muted text-primary font-semibold" : ""
                                                        }`}
                                                >
                                                    <Settings className="h-4 w-4 ml-3" />
                                                    <span>הגדרות</span>
                                                </Link>

                                                <button
                                                    onClick={logout}
                                                    className="flex items-center py-2 px-3 text-sm font-medium rounded-md transition-all hover:bg-destructive/10 mt-auto text-destructive"
                                                >
                                                    <LogOut className="h-4 w-4 ml-3" />
                                                    <span>התנתק</span>
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </nav>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
            {/* Auth Modal */}
            <Dialog open={authOpen} onOpenChange={setAuthOpen}>
                <DialogContent className="max-w-sm w-full p-0 bg-background border-none shadow-none">
                    <DialogTitle></DialogTitle>
                    <AuthForm onAuthSuccess={() => setAuthOpen(false)} />
                </DialogContent>
            </Dialog>
        </header>
    );
};

export default Navbar;
