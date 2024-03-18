import { TypeOf, ZodSchema } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    useForm as useHookForm,
    UseFormProps as UseHookFormProps,
} from 'react-hook-form'

interface UseFormProps<T extends ZodSchema<any>>
    extends UseHookFormProps<TypeOf<T>> {
    schema: T
}

export const useForm = <T extends ZodSchema<any>>({
    schema,
    ...formConfig
}: UseFormProps<T>) =>
    useHookForm({
        ...formConfig,
        resolver: zodResolver(schema),
    })
