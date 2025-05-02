'use client'


import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { getContractTemplate, ContractField, ContractTemplate } from '@/lib/contracts';
import { format } from 'date-fns';
import { CalendarIcon, Save, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useParams } from 'next/navigation';
import Link from 'next/link';
const ContractEdit: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [contract, setContract] = useState<ContractTemplate | undefined>();
    const [loading, setLoading] = useState(true);
    const [formValues, setFormValues] = useState<Record<string, string | Date>>({});
    const [renderedHtml, setRenderedHtml] = useState<string>('');

    useEffect(() => {
        if (id) {
            setLoading(true);
            // In a real app, this would be an API call
            const foundContract = getContractTemplate(id);
            setContract(foundContract);

            // Initialize form values with default values
            if (foundContract) {
                const initialValues: Record<string, string | Date> = {};
                foundContract.fields.forEach(field => {
                    if (field.defaultValue) {
                        initialValues[field.id] = field.defaultValue;
                    } else if (field.type === 'date') {
                        initialValues[field.id] = new Date();
                    } else {
                        initialValues[field.id] = '';
                    }
                });
                setFormValues(initialValues);

                // Try to load draft from localStorage
                const savedDraft = localStorage.getItem(`contract-draft-${id}`);
                if (savedDraft) {
                    try {
                        const parsedDraft = JSON.parse(savedDraft);
                        // Convert date strings back to Date objects
                        foundContract.fields.forEach(field => {
                            if (field.type === 'date' && parsedDraft[field.id]) {
                                parsedDraft[field.id] = new Date(parsedDraft[field.id]);
                            }
                        });
                        setFormValues(parsedDraft);
                        toast.info('טיוטה קודמת נטענה בהצלחה');
                    } catch (error) {
                        console.error('Error loading draft:', error);
                    }
                }
            }

            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        if (contract && contract.content) {
            let processed = contract.content;

            // Replace placeholders with form values
            Object.entries(formValues).forEach(([key, value]) => {
                const placeholder = `{{${key}}}`;
                const stringValue = value instanceof Date
                    ? format(value, 'dd/MM/yyyy')
                    : (value || '');

                processed = processed.split(placeholder).join(stringValue || placeholder);
            });

            setRenderedHtml(processed);

            // Save draft to localStorage
            if (id && Object.keys(formValues).length > 0) {
                localStorage.setItem(`contract-draft-${id}`, JSON.stringify(formValues));
            }
        }
    }, [formValues, contract]);

    const handleInputChange = (fieldId: string, value: string | Date) => {
        setFormValues(prev => ({
            ...prev,
            [fieldId]: value
        }));
    };

    const handleSave = () => {
        // This would save to a database in a real app
        toast.info('שומר את החוזה...');
        setTimeout(() => {
            toast.success('החוזה נשמר בהצלחה');
            //   navigate(`/contracts/${id}`);
        }, 1500);
    };

    const renderField = (field: ContractField) => {
        const value = formValues[field.id];

        switch (field.type) {
            case 'text':
                return (
                    <Input
                        id={field.id}
                        placeholder={field.placeholder}
                        value={value as string || ''}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        required={field.required}
                    />
                );
            case 'textarea':
                return (
                    <Textarea
                        id={field.id}
                        placeholder={field.placeholder}
                        value={value as string || ''}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        required={field.required}
                        rows={4}
                    />
                );
            case 'date':
                return (
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className={cn(
                                    "w-full justify-between text-right font-normal",
                                    !value && "text-muted-foreground"
                                )}
                            >
                                {value instanceof Date ? format(value, 'dd/MM/yyyy') : <span>בחר תאריך</span>}
                                <CalendarIcon className="mr-auto h-4 w-4 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="end">
                            <Calendar
                                mode="single"
                                selected={value instanceof Date ? value : undefined}
                                onSelect={(date) => date && handleInputChange(field.id, date)}
                                initialFocus
                                className={cn("p-3 pointer-events-auto")}
                            />
                        </PopoverContent>
                    </Popover>
                );
            case 'select':
                return (
                    <select
                        id={field.id}
                        value={value as string || ''}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        required={field.required}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <option value="">בחר...</option>
                        {field.options?.map((option) => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                );
            case 'signature':
                // This would be a signature component in a real app
                return (
                    <div className="border border-dashed border-input rounded-md p-4 text-center">
                        <p className="text-muted-foreground">חתימה תהיה זמינה בקרוב</p>
                    </div>
                );
            default:
                return null;
        }
    };

    if (loading) {
        return (
            <>
                <div className="py-8">
                    <div className="flex justify-center items-center min-h-[60vh]">
                        <p>טוען...</p>
                    </div>
                </div>
            </>
        );
    }

    if (!contract) {
        return (
            <>
                <div className="py-8">
                    <div className="flex flex-col justify-center items-center min-h-[60vh]">
                        <h1 className="text-2xl font-bold mb-4">החוזה לא נמצא</h1>
                        <Button asChild>
                            <a href="/">חזרה לדף הבית</a>
                        </Button>
                    </div>
                </div>
            </>
        );
    }

    return (
        <div className="bg-muted/30">
            <div className="">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                    <h1 className="text-2xl font-bold">עריכת {contract.title}</h1>
                    <div className="flex gap-2">
                        <Link href={`/contracts/${id}`}>
                            <Button variant="outline">
                                <Eye className="h-4 w-4 ms-2" />
                                תצוגה מקדימה
                            </Button>
                        </Link>
                        <Button onClick={handleSave}>
                            <Save className="h-4 w-4 ms-2" />
                            שמירה
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Form Section */}
                    <div>
                        <div className="bg-card rounded-lg border shadow-sm p-6">
                            <h2 className="text-xl font-medium mb-6">פרטי החוזה</h2>
                            <div className="space-y-6">
                                {contract.fields.map((field) => (
                                    <div key={field.id} className="space-y-2">
                                        <Label htmlFor={field.id}>
                                            {field.label}
                                            {field.required && <span className="text-destructive mr-1">*</span>}
                                        </Label>
                                        {renderField(field)}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Preview Section */}
                    <div className="hidden lg:block sticky top-8 max-h-[calc(100vh-4rem)] overflow-y-auto">
                        <div className="a4-page">
                            <div dangerouslySetInnerHTML={{ __html: renderedHtml }} />
                        </div>
                    </div>
                </div>

                {/* Mobile-only preview button */}
                <div className="lg:hidden fixed bottom-6 right-6">
                    <Link href={`/contracts/${id}`}>
                        <Button size="lg" className="rounded-full h-14 w-14">
                            <Eye className="h-6 w-6" />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ContractEdit;
