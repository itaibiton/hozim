// @hozim Design System Showcase
// This page displays all UI components and their variants for easy review and design iteration.

'use client';
import * as React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/alert';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Drawer, DrawerTrigger, DrawerContent } from '@/components/ui/drawer';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { Skeleton } from '@/components/ui/skeleton';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { Sidebar, SidebarProvider } from '@/components/ui/sidebar';
import { Popover } from '@/components/ui/popover';
import { Toaster } from '@/components/ui/sonner';
import { Tabs } from '@/components/ui/tabs';
import { DropdownMenu } from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { AnimatedButton } from '@/components/ui/animated-button';
import { useState, useEffect } from 'react';
import { DrawerSheet } from '@/components/ui/drawer-sheet';

// Utility for section animation
const sectionAnim = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);
    return isMobile;
}

export default function DesignSystemPage() {
    const isMobile = useIsMobile();
    return (
        <main className="min-h-screen bg-background text-foreground px-8 py-12 space-y-16">
            <h1 className="text-4xl font-bold mb-8">מערכת העיצוב של @hozim</h1>
            {/* BUTTONS */}
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionAnim}>
                <h2 className="text-2xl font-semibold mb-4">כפתורים</h2>
                <div className="flex flex-wrap gap-4 mb-4">
                    <AnimatedButton>ברירת מחדל</AnimatedButton>
                    <AnimatedButton variant="secondary">משני</AnimatedButton>
                    <AnimatedButton variant="destructive">הרסני</AnimatedButton>
                    <AnimatedButton variant="outline">קו מתאר</AnimatedButton>
                    <AnimatedButton variant="ghost">רפאים</AnimatedButton>
                    <AnimatedButton variant="link">קישור</AnimatedButton>
                    <AnimatedButton size="sm">קטן</AnimatedButton>
                    <AnimatedButton size="lg">גדול</AnimatedButton>
                    <AnimatedButton size="icon"><span className="material-icons">star</span></AnimatedButton>
                </div>
            </motion.section>
            {/* ALERTS */}
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionAnim}>
                <h2 className="text-2xl font-semibold mb-4">התראות</h2>
                <div className="flex flex-col gap-4">
                    <Alert>התראה רגילה</Alert>
                </div>
            </motion.section>
            {/* DIALOGS */}
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionAnim}>
                <h2 className="text-2xl font-semibold mb-4">דיאלוג</h2>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>פתח דיאלוג</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogTitle>כותרת דיאלוג</DialogTitle>
                        <DialogDescription>זהו דיאלוג לדוגמה מתוך מערכת העיצוב.</DialogDescription>
                        <DialogClose asChild>
                            <Button variant="outline">סגור</Button>
                        </DialogClose>
                    </DialogContent>
                </Dialog>
            </motion.section>
            {/* TOOLTIP */}
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionAnim}>
                <h2 className="text-2xl font-semibold mb-4">טול-טיפ</h2>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button>העבר עכבר</Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">זהו טול-טיפ לדוגמה</TooltipContent>
                </Tooltip>
            </motion.section>
            {/* DRAWER */}
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionAnim}>
                <h2 className="text-2xl font-semibold mb-4">מגירה</h2>
                <DrawerSheet
                    trigger={<Button>פתח מגירה</Button>}
                >
                    <DialogTitle className="sr-only">מגירה</DialogTitle>
                    <div className="p-6 text-center">תוכן דמי למגירה</div>
                </DrawerSheet>
            </motion.section>
            {/* AVATAR */}
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionAnim}>
                <h2 className="text-2xl font-semibold mb-4">אווטאר</h2>
                <div className="flex gap-6 items-center">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <span>
                                <Avatar>
                                    <AvatarImage src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" />
                                    <AvatarFallback>AB</AvatarFallback>
                                </Avatar>
                            </span>
                        </TooltipTrigger>
                        <TooltipContent side="top">משתמש לדוגמה</TooltipContent>
                    </Tooltip>
                    <Avatar>
                        <AvatarImage src="" alt="No Image" />
                        <AvatarFallback>CD</AvatarFallback>
                    </Avatar>
                </div>
            </motion.section>
            {/* COLLAPSIBLE */}
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionAnim}>
                <h2 className="text-2xl font-semibold mb-4">אקורדיון</h2>
                <div className="space-y-2 max-w-md">
                    {[1, 2, 3].map((item) => (
                        <Collapsible key={item}>
                            <CollapsibleTrigger asChild>
                                <Button className="w-full text-right justify-between" variant="outline">
                                    פריט {item}
                                    <span className="ms-2">▼</span>
                                </Button>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <div className="p-4 border border-t-0 rounded-b-md bg-muted">תוכן פריט {item}</div>
                            </CollapsibleContent>
                        </Collapsible>
                    ))}
                </div>
            </motion.section>
            {/* BREADCRUMB */}
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionAnim}>
                <h2 className="text-2xl font-semibold mb-4">פירורי לחם</h2>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">דף הבית</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/dashboard">לוח בקרה</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>פרופיל</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </motion.section>
            {/* SKELETON */}
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionAnim}>
                <h2 className="text-2xl font-semibold mb-4">שלד</h2>
                <Skeleton className="w-32 h-8" />
            </motion.section>
            {/* SHEET */}
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionAnim}>
                <h2 className="text-2xl font-semibold mb-4">גיליון</h2>
                <Sheet />
            </motion.section>
            {/* SEPARATOR */}
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionAnim}>
                <h2 className="text-2xl font-semibold mb-4">מפריד</h2>
                <Separator />
            </motion.section>
            {/* POPOVER */}
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionAnim}>
                <h2 className="text-2xl font-semibold mb-4">פופאובר</h2>
                <Popover />
            </motion.section>
            {/* SONNER (Toast) */}
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionAnim}>
                <h2 className="text-2xl font-semibold mb-4">טוסט</h2>
                <Toaster />
            </motion.section>
            {/* TABS */}
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionAnim}>
                <h2 className="text-2xl font-semibold mb-4">טאבים</h2>
                <Tabs />
            </motion.section>
            {/* DROPDOWN MENU */}
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionAnim}>
                <h2 className="text-2xl font-semibold mb-4">תפריט נפתח</h2>
                <DropdownMenu />
            </motion.section>
            {/* LABEL */}
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionAnim}>
                <h2 className="text-2xl font-semibold mb-4">תווית</h2>
                <Label>דוגמה לתווית</Label>
            </motion.section>
            {/* CALENDAR */}
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionAnim}>
                <h2 className="text-2xl font-semibold mb-4">לוח שנה</h2>
                <Calendar />
            </motion.section>
            {/* TEXTAREA */}
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionAnim}>
                <h2 className="text-2xl font-semibold mb-4">תיבת טקסט</h2>
                <Textarea placeholder="הקלד כאן..." />
            </motion.section>
            {/* CARD */}
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionAnim}>
                <h2 className="text-2xl font-semibold mb-4">כרטיס</h2>
                <Card>תוכן כרטיס</Card>
            </motion.section>
            {/* INPUT */}
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionAnim}>
                <h2 className="text-2xl font-semibold mb-4">שדה קלט</h2>
                <Input placeholder="שדה קלט" />
            </motion.section>
        </main>
    );
}

// To extend: Add more variants, props, and code samples for each component as needed. 