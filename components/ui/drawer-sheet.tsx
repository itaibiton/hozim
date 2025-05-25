import * as React from "react";
import { useState, useEffect } from "react";
import { Drawer, DrawerTrigger, DrawerContent } from "@/components/ui/drawer";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";

function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);
    return isMobile;
}

type DrawerSheetProps = {
    trigger: React.ReactNode;
    children: React.ReactNode;
    side?: "left" | "right";
};

export function DrawerSheet({ trigger, children, side = "right" }: DrawerSheetProps) {
    const isMobile = useIsMobile();

    if (isMobile) {
        return (
            <Drawer>
                <DrawerTrigger asChild>{trigger}</DrawerTrigger>
                <DrawerContent>{children}</DrawerContent>
            </Drawer>
        );
    }
    return (
        <Sheet>
            <SheetTrigger asChild>{trigger}</SheetTrigger>
            <SheetContent side={side}>{children}</SheetContent>
        </Sheet>
    );
} 