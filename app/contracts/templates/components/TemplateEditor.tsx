import { useState } from 'react';
import type { ContractTemplate } from '../schemas/template';

interface TemplateEditorProps {
    template?: ContractTemplate;
    onSave: (template: ContractTemplate) => void;
}

export function TemplateEditor({ template, onSave }: TemplateEditorProps) {
    const [name, setName] = useState(template?.name || '');
    const [description, setDescription] = useState(template?.description || '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Implementation for saving template
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium">
                    Template Name
                </label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
            </div>

            <div>
                <label htmlFor="description" className="block text-sm font-medium">
                    Description
                </label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    rows={3}
                />
            </div>

            <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
            >
                Save Template
            </button>
        </form>
    );
} 