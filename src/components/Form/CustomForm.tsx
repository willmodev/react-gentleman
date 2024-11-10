import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ClientModel, ClientSchema } from '../../schemas/client/client.schema';

import FormElement from './FormElement';


export const CustomForm = () => {


    const { control, handleSubmit, formState: { errors } } = useForm<ClientModel>({
        resolver: zodResolver(ClientSchema),
        mode: 'onBlur',
        defaultValues: {
            id: crypto.randomUUID(),
            age: 1,
            name: '',
            email: '',
            confirmEmail: ''
        }
    })

    const onSubmit: SubmitHandler<ClientModel> = (data) => {
        console.log(data);
    }

    return (
        
        <form className='flex justify-center items-center flex-col' onSubmit={handleSubmit(onSubmit)}>
            <FormElement name='id' control={control} label='Id' error={errors.id} type='text' />
            <FormElement name='name' control={control} label='Name' error={errors.name} type='text' />
            <FormElement name='age' control={control} label='Age' error={errors.age} type='number' />
            <FormElement name='email' control={control} label='Email' error={errors.email} type='email' />
            <FormElement name='confirmEmail' control={control} label='Confirm Email' error={errors.confirmEmail} type='email' />

        </form>
    );
}