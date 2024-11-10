import { string, z } from 'zod';

export const ClientSchema = z.object({
    id: z.string({
        required_error: 'El id es requerido',
    }).uuid('No es un uuid').optional(),
    name: string({
        required_error: 'El nombre es requerido',
    }).min(3, 'Debe tener minimo 3 caracteres.'),
    age: z.number({
        required_error: 'La edad es requerida',
    }).positive('El valor debe ser positivo').int(),
    email: z.string({
        required_error: 'El correo es requerido',
    }).email('El correo es inválido'),
    confirmEmail: z.string({
        required_error: 'El correo es requerido',
    }).email('El correo es inválido'),
}).refine((data) => data.email === data.confirmEmail, {
    message: 'Los emails son diferentes',
    path: ['confirmEmail']
});

export type ClientModel = z.infer<typeof ClientSchema>;