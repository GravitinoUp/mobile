import { TypeOf, ZodSchema } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    FieldValues,
    FormProvider,
    UseFormReturn,
    useForm as useHookForm,
    UseFormProps as UseHookFormProps,
} from 'react-hook-form'

interface UseFormProps<T extends ZodSchema<any>>
    extends UseHookFormProps<TypeOf<T>> {
    schema: T
}

interface FormProps<T extends FieldValues = any> {
    form: UseFormReturn<T>
    children: React.ReactNode
}

export const useForm = <T extends ZodSchema<any>>({
    schema,
    ...formConfig
}: UseFormProps<T>) =>
    useHookForm({
        ...formConfig,
        resolver: zodResolver(schema),
    })

export const CustomForm = <T extends FieldValues>({
    form,
    children,
}: FormProps<T>) => <FormProvider {...form}>{children}</FormProvider>
