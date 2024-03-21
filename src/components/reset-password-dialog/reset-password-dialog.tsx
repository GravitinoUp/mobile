import { EyeIcon, EyeOffIcon, HStack, Text, VStack } from '@gluestack-ui/themed'
import Dialog from '../ui/dialog'
import AppButton from '../ui/button'
import AppInput from '../ui/input'
import { z } from 'zod'
import { CustomForm, useForm } from '../form/form'
import { FormField, FormItem, FormMessage } from '../ui/form'
import { useEffect, useState } from 'react'
import { useUpdateUserPasswordMutation } from '../../redux/api/users'
import useSuccessToast from '../../hooks/use-success-toast'
import AppStrings from '../../constants/strings'
import useErrorToast from '../../hooks/use-error-toast'

const resetPasswordSchema = z
    .object({
        password: z.string(),
        repeatPassword: z
            .string()
            .min(6, 'Пароль должен быть длиннее 6 символов'),
    })
    .refine(
        (values) => values.password.trim() === values.repeatPassword.trim(),
        {
            message: 'Пароли не совпадают!',
            path: ['repeatPassword'],
        }
    )

type ResetDialogProps = {
    isOpen: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ResetPasswordDialog = ({ isOpen, setOpen }: ResetDialogProps) => {
    const [passwordHidden, setPasswordHidden] = useState(true)
    const [repeatPasswordHidden, setRepeatPasswordHidden] = useState(true)

    const form = useForm({
        schema: resetPasswordSchema,
        defaultValues: {
            password: '',
            repeatPassword: '',
        },
    })

    const [updateUserPassword, { isLoading, isSuccess, error }] =
        useUpdateUserPasswordMutation()

    const onSubmit = (data: z.infer<typeof resetPasswordSchema>) => {
        updateUserPassword(data.password)
    }

    useEffect(() => {
        if (isSuccess) {
            setOpen(false)
        }
    }, [isSuccess])

    useSuccessToast(AppStrings.passwordSuccessUpdate, isSuccess)
    useErrorToast(error)

    return (
        <Dialog
            title="Восстановление пароля"
            isOpen={isOpen}
            setOpen={setOpen}
            footer={
                <HStack gap="$2">
                    <AppButton
                        w={150}
                        text={AppStrings.change}
                        onPress={form.handleSubmit(onSubmit)}
                        isLoading={isLoading}
                    />
                </HStack>
            }
            dismissable={false}
        >
            <CustomForm form={form}>
                <VStack>
                    <Text fontSize={14} mb="$4">
                        {AppStrings.updatePasswordDescription}
                    </Text>
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem style={{ marginBottom: 8 }}>
                                <AppInput
                                    value={field.value}
                                    onChangeText={field.onChange}
                                    hint={AppStrings.newPassword}
                                    placeholder={AppStrings.newPassword}
                                    required
                                    secureTextEntry={passwordHidden}
                                    trailingIcon={
                                        passwordHidden ? (
                                            <EyeOffIcon />
                                        ) : (
                                            <EyeIcon />
                                        )
                                    }
                                    onTrailingIconPress={() =>
                                        setPasswordHidden(!passwordHidden)
                                    }
                                />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="repeatPassword"
                        render={({ field }) => (
                            <FormItem style={{ marginBottom: 8 }}>
                                <AppInput
                                    value={field.value}
                                    onChangeText={field.onChange}
                                    hint={AppStrings.repeatNewPassword}
                                    placeholder={AppStrings.repeatNewPassword}
                                    required
                                    secureTextEntry={repeatPasswordHidden}
                                    trailingIcon={
                                        repeatPasswordHidden ? (
                                            <EyeOffIcon />
                                        ) : (
                                            <EyeIcon />
                                        )
                                    }
                                    onTrailingIconPress={() =>
                                        setRepeatPasswordHidden(
                                            !repeatPasswordHidden
                                        )
                                    }
                                />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormMessage />
                </VStack>
            </CustomForm>
        </Dialog>
    )
}

export default ResetPasswordDialog
