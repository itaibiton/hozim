'use client'


import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { getContractTemplate, ContractTemplate } from '@/lib/contracts';
import { FileText, Download, Edit, X, Save } from 'lucide-react';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';
import Link from 'next/link';
import ContractEditor from '@/components/contracts/ContractEditor';
import { format } from 'date-fns';
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { DialogTitle, DialogDescription } from '@radix-ui/react-dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Pencil } from 'lucide-react';
import { cn } from '@/lib/utils';
import parse, { domToReact } from 'html-react-parser';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem
} from '@/components/ui/dropdown-menu';
import {
    Tooltip,
    TooltipTrigger,
    TooltipContent
} from '@/components/ui/tooltip';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogClose,
} from '@/components/ui/dialog';


const ContractView: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [contract, setContract] = useState<ContractTemplate | undefined>();
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [exportDrawerOpen, setExportDrawerOpen] = useState(false);

    // Lifted state for form values and rendered HTML
    const [formValues, setFormValues] = useState<Record<string, string | Date>>({});
    const [renderedHtml, setRenderedHtml] = useState<string>('');
    const [editingField, setEditingField] = useState<string | null>(null);
    const [editingValue, setEditingValue] = useState<string>('');
    const [unsavedFormValues, setUnsavedFormValues] = useState<Record<string, string | Date> | null>(null);
    const [showCancelDialog, setShowCancelDialog] = useState(false);

    useEffect(() => {
        if (id) {
            setLoading(true);
            const foundContract = getContractTemplate(id);
            setContract(foundContract);
            setLoading(false);
        }
    }, [id]);

    // Initialize form values when contract loads
    useEffect(() => {
        if (contract) {
            const initialValues: Record<string, string | Date> = {};
            contract.fields.forEach(field => {
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
                    contract.fields.forEach(field => {
                        if (field.type === 'date' && parsedDraft[field.id]) {
                            parsedDraft[field.id] = new Date(parsedDraft[field.id]);
                        }
                    });
                    setFormValues(parsedDraft);
                } catch (error) {
                    console.error('Error loading draft:', error);
                }
            }
        }
    }, [contract, id]);

    // Update renderedHtml when formValues or contract change
    useEffect(() => {
        if (contract && contract.content) {
            let processed = contract.content;
            Object.entries(formValues).forEach(([key, value]) => {
                const placeholder = `{{${key}}}`;
                const stringValue = value instanceof Date
                    ? format(value, 'dd/MM/yyyy')
                    : (value || '_____');
                processed = processed.split(placeholder).join(stringValue);
            });
            processed = processed.replace(/\{\{[^}]+\}\}/g, '_____');
            setRenderedHtml(processed);
            if (id && Object.keys(formValues).length > 0) {
                localStorage.setItem(`contract-draft-${id}`, JSON.stringify(formValues));
            }
        }
    }, [formValues, contract, id]);

    // Helper to render inline editable field (text only for now)
    const renderInlineField = (fieldId: string) => {
        const field = contract?.fields.find(f => f.id === fieldId);
        const value = formValues[fieldId];
        if (!field) return '_____';
        if (field.type !== 'text') {
            if (value instanceof Date) return format(value, 'dd/MM/yyyy');
            return value || '_____';
        }
        const displayValue = value ? value as string : '_____';
        return (
            <Popover open={editingField === fieldId} onOpenChange={open => { if (!open) setEditingField(null); }}>
                <PopoverTrigger asChild>
                    <span className="inline-flex items-center cursor-pointer underline underline-offset-2 decoration-dotted decoration-muted group" onClick={() => { setEditingField(fieldId); setEditingValue(value as string || ''); }}>
                        {displayValue}
                        <Pencil className="w-3 h-3 ml-1 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </span>
                </PopoverTrigger>
                <PopoverContent className="w-56 p-2 flex flex-col gap-2" align="center">
                    <Input
                        autoFocus
                        value={editingValue}
                        onChange={e => setEditingValue(e.target.value)}
                        onKeyDown={e => {
                            if (e.key === 'Enter') {
                                setFormValues(v => ({ ...v, [fieldId]: editingValue }));
                                setEditingField(null);
                            }
                        }}
                    />
                    <div className="flex gap-2 justify-end mt-2">
                        <Button size="sm" variant="outline" onClick={() => setEditingField(null)}>
                            ביטול
                        </Button>
                        <Button size="sm" onClick={() => {
                            setFormValues(v => ({ ...v, [fieldId]: editingValue }));
                            setEditingField(null);
                        }}>
                            שמור
                        </Button>
                    </div>
                </PopoverContent>
            </Popover>
        );
    };

    // Render contract content as HTML with inline fields (robust version)
    const renderContractHtml = () => {
        if (!contract) return null;
        // Replace all {{field}} with a unique HTML tag
        let html = contract.content.replace(/\{\{([^}]+)\}\}/g, (match, fieldId) => `<field-placeholder data-id="${fieldId}"></field-placeholder>`);
        // Parse HTML and replace <field-placeholder> with React components
        return parse(html, {
            replace: domNode => {
                // @ts-ignore
                if (domNode.name === 'field-placeholder' && domNode.attribs && domNode.attribs['data-id']) {
                    // @ts-ignore
                    return renderInlineField(domNode.attribs['data-id']);
                }
            }
        });
    };

    const handleExportPDF = () => {
        // This would use a PDF generation library in a real app
        toast.info('מייצא ל-PDF...');
        setTimeout(() => {
            toast.success('החוזה יוצא בהצלחה ל-PDF');
        }, 1500);
    };

    const handleExportDOCX = () => {
        // This would use a DOCX generation library in a real app
        toast.info('מייצא ל-DOCX...');
        setTimeout(() => {
            toast.success('החוזה יוצא בהצלחה ל-DOCX');
        }, 1500);
    };

    // Desktop edit/save/cancel logic
    const handleDesktopEdit = () => {
        setUnsavedFormValues({ ...formValues });
        setEditMode(true);
    };
    const handleDesktopSave = () => {
        if (unsavedFormValues) {
            setFormValues({ ...unsavedFormValues });
        }
        setEditMode(false);
        setUnsavedFormValues(null);
    };
    const handleDesktopCancel = () => {
        setShowCancelDialog(true);
    };
    const confirmCancel = () => {
        setEditMode(false);
        setUnsavedFormValues(null);
        setShowCancelDialog(false);
    };
    const cancelCancel = () => {
        setShowCancelDialog(false);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <p>טוען...</p>
            </div>
        );
    }

    if (!contract || !id) {
        return (
            <div className="flex flex-col justify-center items-center min-h-[60vh]">
                <h1 className="text-2xl font-bold mb-4">החוזה לא נמצא</h1>
                <Button asChild>
                    <Link href="/">חזרה לדף הבית</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="w-full flex flex-col">
            {/* Top bar with actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div className="flex items-center">
                    <FileText className="h-6 w-6" />
                    <h1 className="text-2xl font-bold">{contract.title}</h1>
                </div>
                <div className="flex gap-3">
                    {/* Edit button for mobile (Drawer) */}
                    <div className="block lg:hidden">
                        <Drawer
                            open={drawerOpen}
                            onOpenChange={(open) => {
                                setDrawerOpen(open);
                                if (!open) setEditMode(false);
                            }}
                        >
                            <DialogTitle></DialogTitle>
                            <DrawerTrigger asChild>
                                <Button onClick={() => {
                                    setEditMode(true);
                                    setDrawerOpen(true);
                                }}>
                                    עריכה
                                    <Edit className="h-4 w-4" />
                                </Button>
                            </DrawerTrigger>
                            <DrawerContent>
                                <div className="mx-auto w-full max-w-sm">
                                    <ContractEditor contract={contract} id={id} onClose={() => setDrawerOpen(false)} formValues={formValues} setFormValues={setFormValues} />
                                </div>
                            </DrawerContent>
                        </Drawer>
                    </div>
                    {/* Export Drawer for mobile */}
                    <div className="block lg:hidden">
                        <Drawer
                            open={exportDrawerOpen}
                            onOpenChange={setExportDrawerOpen}
                        >
                            <DialogTitle></DialogTitle>
                            <DrawerTrigger asChild>
                                <Button variant="outline" onClick={() => setExportDrawerOpen(true)} disabled={editMode}>
                                    ייצוא
                                    <Download className="h-4 w-4" />
                                </Button>
                            </DrawerTrigger>
                            <DrawerContent>
                                <div className="mx-auto w-full max-w-sm flex flex-col gap-4 p-6">
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            handleExportDOCX();
                                            setExportDrawerOpen(false);
                                        }}
                                        className="w-full"
                                    >
                                        ייצא ל-DOCX
                                        <Download className="h-4 w-4 ml-2" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            handleExportPDF();
                                            setExportDrawerOpen(false);
                                        }}
                                        className="w-full"
                                    >
                                        ייצא ל-PDF
                                        <Download className="h-4 w-4 ml-2" />
                                    </Button>
                                </div>
                            </DrawerContent>
                        </Drawer>
                    </div>
                    {/* Export Dropdown for desktop */}
                    <div className="hidden lg:block">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <span>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" disabled={editMode}>
                                                ייצוא
                                                <Download className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={handleExportDOCX} className="gap-2">
                                                <Download className="h-4 w-4" /> ייצא ל-DOCX
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={handleExportPDF} className="gap-2">
                                                <Download className="h-4 w-4" /> ייצא ל-PDF
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </span>
                            </TooltipTrigger>
                            {editMode && (
                                <TooltipContent side="bottom" variant="destructive">
                                    לא ניתן לייצא בזמן עריכה
                                </TooltipContent>
                            )}
                        </Tooltip>
                    </div>
                    {/* Edit button for desktop (side panel) */}
                    <div className="hidden lg:flex gap-3">
                        {editMode ? (
                            <>
                                <Button onClick={handleDesktopSave}>
                                    שמור
                                    <Save className="h-4 w-4" />
                                </Button>
                                <Button onClick={handleDesktopCancel} variant="destructive">
                                    ביטול
                                    <X className="h-4 w-4" />
                                </Button>
                            </>
                        ) : (
                            <Button onClick={handleDesktopEdit}>
                                עריכה
                                <Edit className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                </div>
            </div>
            {/* Main content area: flex for desktop, stacked for mobile */}
            <div className={`flex w-full transition-all duration-300 flex-col lg:flex-row gap-4`}>
                {/* Contract view */}
                <div className={`transition-all duration-300 ${editMode ? 'lg:w-1/2' : 'w-full'}`}>
                    <div className="flex-1 ">
                        <div className="a4-page mb-8">
                            {renderContractHtml()}
                        </div>

                    </div>
                </div>
                {/* Editor panel: desktop only */}
                <div
                    className={`hidden lg:block transition-all duration-300 overflow-hidden
                        ${editMode ? 'lg:w-1/2 min-w-[300px]' : 'w-0 min-w-0 p-0'}
                    `}
                    style={{ maxWidth: editMode ? '50%' : 0 }}
                >
                    {editMode && (
                        <ContractEditor
                            contract={contract}
                            id={id}
                            onClose={() => setEditMode(false)}
                            formValues={unsavedFormValues || {}}
                            setFormValues={setUnsavedFormValues as React.Dispatch<React.SetStateAction<Record<string, string | Date>>>}
                        />
                    )}
                </div>
            </div>
            {/* Confirmation Dialog */}
            <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
                <DialogContent>
                    <DialogTitle>לבטל שינויים?</DialogTitle>
                    <DialogDescription>
                        כל השינויים שביצעת בעריכה זו יאבדו. האם אתה בטוח שברצונך לבטל?
                    </DialogDescription>
                    <div className="flex gap-2 justify-end mt-4">
                        <DialogClose asChild>
                            <Button variant="outline" onClick={cancelCancel}>המשך עריכה</Button>
                        </DialogClose>
                        <Button variant="destructive" onClick={confirmCancel}>בטל שינויים</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ContractView;



