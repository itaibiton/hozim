'use client'

import { contractCategories } from "@/lib/contracts"
import { Input } from "../ui/input"
import { Search } from "lucide-react"
import { Button } from "../ui/button"
import { Card } from "../ui/card"
import Navbar from "./navbar"
import { Toaster } from "../ui/sonner"
import { useEffect } from "react"
import { useState } from "react"
export default function ClientLayout({ children }: { children: React.ReactNode }) {

    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setMounted(true)
        }
    }, [])

    if (!mounted) return null

    return (
        <div className="h-screen bg-background relative">
            <Navbar />
            <main className="w-full container mx-auto px-4 lg:px-0 relative z-0 pt-24 pb-4">
                {children}
            </main>
            <Toaster />
        </div>
    )
}
