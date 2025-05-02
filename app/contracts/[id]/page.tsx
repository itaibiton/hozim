'use client'


import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { getContractTemplate, ContractTemplate } from '@/lib/contracts';
import { FileText, Download, Edit } from 'lucide-react';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';
import Link from 'next/link';


const ContractView: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [contract, setContract] = useState<ContractTemplate | undefined>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            setLoading(true);
            // In a real app, this would be an API call
            const foundContract = getContractTemplate(id);
            setContract(foundContract);
            setLoading(false);
        }
    }, [id]);

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

    if (loading) {
        return (
            <div className="">
                <div className="flex justify-center items-center min-h-[60vh]">
                    <p>טוען...</p>
                </div>
            </div>
        );
    }

    if (!contract) {
        return (
            <div>
                <div className="flex flex-col justify-center items-center min-h-[60vh]">
                    <h1 className="text-2xl font-bold mb-4">החוזה לא נמצא</h1>
                    <Button asChild>
                        <Link href="/">חזרה לדף הבית</Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="container py-8">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                    <div className="flex items-center">
                        <FileText className="h-6 w-6 ms-2" />
                        <h1 className="text-2xl font-bold">{contract.title}</h1>
                    </div>

                    <div className="flex gap-3">
                        <Button variant="outline" onClick={handleExportDOCX}>
                            <Download className="h-4 w-4 ms-2" />
                            DOCX
                        </Button>
                        <Button variant="outline" onClick={handleExportPDF}>
                            <Download className="h-4 w-4 ms-2" />
                            PDF
                        </Button>
                        <Button asChild>
                            <Link href={`/contracts/${id}/edit`}>
                                <Edit className="h-4 w-4 ms-2" />
                                עריכה
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="a4-page mb-8">
                    <div dangerouslySetInnerHTML={{ __html: contract.content }} />
                </div>

                <div className="flex justify-center gap-4 mb-8">
                    <Button variant="outline" onClick={handleExportDOCX}>
                        <Download className="h-4 w-4 ms-2" />
                        ייצא ל-DOCX
                    </Button>
                    <Button variant="default" onClick={handleExportPDF}>
                        <Download className="h-4 w-4 ms-2" />
                        ייצא ל-PDF
                    </Button>
                </div>
            </div>
        </>
    );
};

export default ContractView;
