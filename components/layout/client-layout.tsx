'use client'

import { contractCategories } from "@/lib/contracts"
import { Input } from "../ui/input"
import { Search } from "lucide-react"
import { Button } from "../ui/button"
import { Card } from "../ui/card"
import Navbar from "./navbar"
import { Toaster } from "../ui/sonner"
export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            {children}
            <Toaster />
        </div>
    )
}