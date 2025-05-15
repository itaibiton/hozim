import { z } from 'zod';

export const ContractTemplateSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    version: z.string(),
    sections: z.array(z.object({
        id: z.string(),
        title: z.string(),
        content: z.string(),
        variables: z.array(z.object({
            name: z.string(),
            type: z.enum(['text', 'number', 'date', 'select']),
            required: z.boolean(),
            options: z.array(z.string()).optional(),
        })),
    })),
    metadata: z.object({
        createdAt: z.date(),
        updatedAt: z.date(),
        author: z.string(),
        category: z.string(),
    }),
});

export type ContractTemplate = z.infer<typeof ContractTemplateSchema>; 