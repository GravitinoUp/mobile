import { SafeAreaView } from 'react-native-safe-area-context'
import { Image, ScrollView, StyleSheet, View } from 'react-native'
import { AppColors } from '../../constants/colors'
import { useEffect, useState } from 'react'
import { EyeIcon, EyeOffIcon, Text, VStack } from '@gluestack-ui/themed'
import { CustomForm, useForm } from '../../components/form/form'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAuthMutation } from '../../redux/api/auth'
import { setAccessToken, setRefreshToken } from '../../redux/reducers/authSlice'
import AppStrings from '../../constants/strings'
import AppInput from '../../components/ui/input'
import AppCheckbox from '../../components/ui/checkbox'
import AppButton from '../../components/ui/button'
import { z } from 'zod'
import Watermark from '../../components/watermark/watermark'
import { FormField, FormItem, FormMessage } from '../../components/ui/form'
import useErrorToast from '../../hooks/use-error-toast'

const authSchema = z.object({
    email: z.string().email({ message: AppStrings.wrongEmailFormat }),
    password: z.string().min(1, AppStrings.required),
})

export default function AuthScreen({ navigation }: any) {
    const form = useForm({
        schema: authSchema,
        defaultValues: {
            email: '',
            password: '',
        },
    })

    const [passwordHidden, setPasswordHidden] = useState(true)
    const [isChecked, setChecked] = useState(true)

    const dispatch = useAppDispatch()
    const [authUser, { data, error, isSuccess, isLoading }] = useAuthMutation()

    const onSubmit = (authData: z.infer<typeof authSchema>) => {
        authUser(authData)
    }

    useEffect(() => {
        if (isSuccess) {
            dispatch(setAccessToken(data?.accessToken))
            if (isChecked) {
                dispatch(setRefreshToken(data?.refreshToken))
            }

            navigation.navigate('NavigationScreen')
        }
    }, [isSuccess])

    useErrorToast(error)

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.loginScreenScrollView}>
                <View style={{ flex: 3 }} />
                <Image
                    style={{
                        width: 'auto',
                        height: 60,
                        objectFit: 'contain',
                        marginBottom: 20,
                    }}
                    source={require('../../assets/images/rosgranstroy-logo-main.png')}
                />
                <Text
                    mb="$5"
                    color={AppColors.text}
                    textAlign="center"
                    fontSize="$md"
                    fontWeight="$medium"
                >
                    {AppStrings.signInDescription}
                </Text>

                <VStack px="$10">
                    <CustomForm form={form}>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem style={{ marginBottom: 8 }}>
                                    <AppInput
                                        value={field.value}
                                        onChangeText={field.onChange}
                                        hint="Email"
                                        placeholder="Email"
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem style={{ marginBottom: 8 }}>
                                    <AppInput
                                        value={field.value}
                                        onChangeText={field.onChange}
                                        hint="Пароль"
                                        placeholder="Пароль"
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
                    </CustomForm>
                    <VStack gap="$3" my="$6">
                        <AppCheckbox
                            value=""
                            label={AppStrings.rememberSignIn}
                            isChecked={isChecked}
                            onChange={(checked) => setChecked(checked)}
                        />
                    </VStack>
                </VStack>
                <View style={{ flex: 1 }} />
                <AppButton
                    onPress={form.handleSubmit(onSubmit)}
                    text="Войти"
                    isLoading={isLoading}
                    mx="$10"
                />
                <View style={{ flex: 1, minHeight: 8 }} />
                <Watermark mb="$2" />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    loginScreenScrollView: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingVertical: 8,
        backgroundColor: AppColors.background,
    },
    title: {
        flex: 1,
        fontSize: 24,
        fontWeight: '700',
        color: AppColors.primary,
        textAlign: 'center',
        paddingBottom: 20,
    },
    description: {
        flex: 1,
        fontSize: 16,
        fontWeight: '500',
        color: AppColors.text,
        textAlign: 'center',
        paddingBottom: 20,
    },
    registerUpper: {
        fontSize: 14,
        lineHeight: 21,
        color: AppColors.hint,
        textAlign: 'center',
    },
    registerLower: {
        fontSize: 14,
        lineHeight: 21,
        color: AppColors.primary,
        textAlign: 'center',
    },
})
