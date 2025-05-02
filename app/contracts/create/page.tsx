'use client'
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { contractCategories, contractTemplates } from '@/lib/contracts';
import { Search, ArrowRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
export default function Page() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState<string | null>(null);



    const filteredTemplates = searchQuery
        ? contractTemplates.filter(template =>
            template.title.includes(searchQuery) || template.description.includes(searchQuery))
        : activeCategory
            ? contractTemplates.filter(template => template.category === activeCategory)
            : contractTemplates;

    return (
        <>
            <div className="container py-8">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                    <h1 className="text-2xl font-bold">יצירת חוזה חדש</h1>
                </div>

                <div className="mb-8">
                    <div className="flex max-w-md relative mb-6">
                        <Input
                            type="text"
                            placeholder="חפש חוזה לפי שם..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pr-10"
                        />
                        <Search className="absolute top-1/2 transform -translate-y-1/2 right-3 h-5 w-5 text-muted-foreground" />
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <Button
                            variant={activeCategory === null ? "default" : "outline"}
                            size="sm"
                            onClick={() => setActiveCategory(null)}
                        >
                            הכל
                        </Button>
                        {contractCategories.map((category) => (
                            <Button
                                key={category.id}
                                variant={activeCategory === category.id ? "default" : "outline"}
                                size="sm"
                                onClick={() => setActiveCategory(category.id)}
                            >
                                <span className="me-2">{category.icon}</span>
                                {category.title}
                            </Button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTemplates.map((template) => (
                        <Card
                            className="overflow-hidden  hover:border-primary transition-all duration-200"
                            key={template.id}

                        // onClick={() => handleSelectTemplate(template.id)}
                        >
                            <CardHeader>
                                <div className="text-3xl mb-2">{template.thumbnail}</div>
                                <CardTitle className="text-lg">{template.title}</CardTitle>
                                <CardDescription>{template.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Link
                                    href={`/contracts/${template.id}`}
                                >
                                    <Button className="w-full cursor-pointer">
                                        התחל עריכה
                                        <ArrowLeft className="h-4 w-4 me-2" />
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>

                    ))}

                    {filteredTemplates.length === 0 && (
                        <div className="col-span-full py-12 text-center">
                            <h3 className="text-xl font-medium mb-2">לא נמצאו חוזים מתאימים</h3>
                            <p className="text-muted-foreground">נסה לשנות את החיפוש או את הקטגוריה</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

