import { HStack, Text, VStack } from '@gluestack-ui/themed'
import Dialog from '../ui/dialog'
import AppButton from '../ui/button'
import AppInput from '../ui/input'
import { z } from 'zod'
import { CustomForm, useForm } from '../form/form'
import { FormField, FormItem, FormMessage } from '../ui/form'
import { Fragment } from 'react'

const resetPasswordSchema = z.object({
    password: z.string().min(6, 'Пароль должен быть длиннее 6 символов'),
    repeatPassword: z.string().min(6, 'Пароль должен быть длиннее 6 символов'),
})

type ResetDialogProps = {
    isOpen: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ResetPasswordDialog = ({ isOpen, setOpen }: ResetDialogProps) => {
    const form = useForm({
        schema: resetPasswordSchema,
        defaultValues: {
            password: '',
            repeatPassword: '',
        },
    })

    const onSubmit = (data: z.infer<typeof resetPasswordSchema>) => {}

    return (
        <Dialog
            title="Восстановление пароля"
            isOpen={isOpen}
            setOpen={setOpen}
            footer={
                <HStack gap="$2">
                    <AppButton
                        text="Сохранить"
                        onPress={form.handleSubmit(onSubmit)}
                    />
                </HStack>
            }
            dismissable={false}
        >
            <CustomForm form={form}>
                <VStack>
                    <Text fontSize={14} mb="$4">
                        {
                            'Чтобы продолжить пользоваться приложением, установите постоянный пароль'
                        }
                    </Text>
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem style={{ marginBottom: 8 }}>
                                <AppInput
                                    value={field.value}
                                    onChangeText={field.onChange}
                                    hint="Новый пароль"
                                    placeholder="Новый пароль"
                                    required
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
                                    hint="Повторите новый пароль"
                                    placeholder="Повторите новый пароль"
                                    required
                                />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </VStack>
            </CustomForm>
        </Dialog>
    )
}

export default ResetPasswordDialog
