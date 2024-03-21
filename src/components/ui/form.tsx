import { Text, View } from '@gluestack-ui/themed'
import { createContext, useContext, useId } from 'react'
import {
    Controller,
    ControllerProps,
    FieldPath,
    FieldValues,
    useFormContext,
} from 'react-hook-form'
import AppStrings from '../../constants/strings'
import { AppColors } from '../../constants/colors'
import { StyleProp, ViewStyle } from 'react-native'

type FormFieldContextValue<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
    name: TName
}

const FormFieldContext = createContext<FormFieldContextValue>(
    {} as FormFieldContextValue
)

type FormItemContextValue = {
    id: string
}

const FormItemContext = createContext<FormItemContextValue>(
    {} as FormItemContextValue
)

const useFormField = () => {
    const fieldContext = useContext(FormFieldContext)
    const itemContext = useContext(FormItemContext)
    const { getFieldState, formState } = useFormContext()

    const fieldState = getFieldState(fieldContext.name, formState)

    if (!fieldContext) {
        throw new Error('useFormField should be used within <FormField>')
    }

    const { id } = itemContext

    return {
        id,
        name: fieldContext.name,
        formItemId: `${id}-form-item`,
        formDescriptionId: `${id}-form-item-description`,
        formMessageId: `${id}-form-item-message`,
        ...fieldState,
    }
}

const FormField = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
    ...props
}: ControllerProps<TFieldValues, TName>) => (
    <FormFieldContext.Provider value={{ name: props.name }}>
        <Controller {...props} />
    </FormFieldContext.Provider>
)

const FormItem = ({
    style,
    children,
}: {
    style: StyleProp<ViewStyle>
    children?: React.ReactNode
}) => {
    const id = useId()

    return (
        <FormItemContext.Provider value={{ id }}>
            <View style={style}>{children}</View>
        </FormItemContext.Provider>
    )
}

const FormMessage = ({ children }: { children?: React.ReactNode }) => {
    const { error, formMessageId } = useFormField()
    const body = error ? String(error?.message) : children

    if (!body) {
        return null
    }

    return (
        <Text fontSize={14} color={AppColors.error} id={formMessageId}>
            {body}
        </Text>
    )
}

export { useFormField, FormField, FormItem, FormMessage }
