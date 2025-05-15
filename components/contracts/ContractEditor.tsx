import React, { useEffect, useState, useMemo } from 'react';
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
import { format } from 'date-fns';
import { CalendarIcon, Save, Eye, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import Link from 'next/link';
import type { ContractField, ContractTemplate } from '@/lib/contracts';

interface ContractEditorProps {
    contract: ContractTemplate;
    id: string;
    onClose?: () => void;
    formValues: Record<string, string | Date>;
    setFormValues: React.Dispatch<React.SetStateAction<Record<string, string | Date>>>;
}

const FIELDS_PER_PAGE = 5;

const ContractEditor: React.FC<ContractEditorProps> = ({ contract, id, onClose, formValues, setFormValues }) => {
    const [renderedHtml, setRenderedHtml] = useState<string>('');
    const [page, setPage] = useState(0);

    // Calculate pagination
    const totalPages = useMemo(() => Math.ceil(contract.fields.length / FIELDS_PER_PAGE), [contract.fields.length]);
    const pagedFields = useMemo(() => {
        const start = page * FIELDS_PER_PAGE;
        return contract.fields.slice(start, start + FIELDS_PER_PAGE);
    }, [contract.fields, page]);

    useEffect(() => {
        if (contract && contract.content) {
            let processed = contract.content;
            Object.entries(formValues).forEach(([key, value]) => {
                const placeholder = `{{${key}}}`;
                const stringValue = value instanceof Date
                    ? format(value, 'dd/MM/yyyy')
                    : (value || '');
                processed = processed.split(placeholder).join(stringValue || placeholder);
            });
            setRenderedHtml(processed);
            if (id && Object.keys(formValues).length > 0) {
                localStorage.setItem(`contract-draft-${id}`, JSON.stringify(formValues));
            }
        }
    }, [formValues, contract, id]);

    const handleInputChange = (fieldId: string, value: string | Date) => {
        setFormValues(prev => ({
            ...prev,
            [fieldId]: value
        }));
    };

    const handleSave = () => {
        toast.info('שומר את החוזה...');
        setTimeout(() => {
            toast.success('החוזה נשמר בהצלחה');
            if (onClose) onClose();
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
                return (
                    <div className="border border-dashed border-input rounded-md p-4 text-center">
                        <p className="text-muted-foreground">חתימה תהיה זמינה בקרוב</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="h-full w-full flex flex-col">
            <div className="flex-1 overflow-auto">
                <div className="bg-card rounded-lg border shadow-sm p-4 mb-4">
                    <h2 className="text-xl font-medium mb-6">פרטי החוזה</h2>
                    <div className="space-y-6">
                        {pagedFields.map((field) => (
                            <div key={field.id} className="space-y-2">
                                <Label htmlFor={field.id}>
                                    {field.label}
                                    {field.required && <span className="text-destructive mr-1">*</span>}
                                </Label>
                                {renderField(field)}
                            </div>
                        ))}
                    </div>
                    {/* Pagination controls */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-between mt-6">
                            <Button
                                variant="outline"
                                onClick={() => setPage((p) => Math.max(0, p - 1))}
                                disabled={page === 0}
                            >
                                הקודם
                            </Button>
                            <span className="text-sm">
                                עמוד {page + 1} מתוך {totalPages}
                            </span>
                            <Button
                                variant="outline"
                                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                                disabled={page === totalPages - 1}
                            >
                                הבא
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContractEditor; 