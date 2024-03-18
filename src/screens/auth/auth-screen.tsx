import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { AppColors } from '../../constants/colors'
import { useEffect, useState } from 'react'
import AppStrings from '../../constants/strings'
import AppButton from '../../components/ui/button'
import AppCheckbox from '../../components/ui/checkbox'
import TextButton from '../../components/ui/text-button'
import {
    EyeIcon,
    EyeOffIcon,
    FormControl,
    FormControlError,
    FormControlErrorIcon,
} from '@gluestack-ui/themed'
import WarningIcon from '../../components/icons/WarningIcon'
import { useAuthMutation } from '../../redux/api/auth'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { setAccessToken, setRefreshToken } from '../../redux/reducers/authSlice'
import AppFormControlErrorText from '../../components/form/form-control-error-text'
import AppInput from '../../components/ui/input'
import { useForm } from '../../components/form/form'
import { z } from 'zod'
import { Controller } from 'react-hook-form'

const authSchema = z.object({
    email: z.string(),
    password: z.string(),
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
    const [authUser, { data, error, isError, isSuccess, isLoading }] =
        useAuthMutation()

    const handleSubmit = (authData: z.infer<typeof authSchema>) => {
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

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.loginScreenScrollView}>
                <View style={{ flex: 3 }} />
                <Text style={styles.title}>{AppStrings.appName}</Text>
                <Text style={styles.description}>
                    {AppStrings.signInDescription}
                </Text>
                <FormControl
                    isInvalid={isError}
                    style={{
                        flex: 1,
                        flexDirection: 'column',
                        paddingBottom: 20,
                    }}
                >
                    <Controller
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <AppInput
                                style={{ marginBottom: 8 }}
                                value={field.value}
                                onChangeText={field.onChange}
                                hint="Email"
                                placeholder="Email"
                            />
                        )}
                    />
                    <Controller
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <AppInput
                                style={{ marginBottom: 8 }}
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
                        )}
                    />
                    <FormControlError>
                        <FormControlErrorIcon as={WarningIcon} />
                        <AppFormControlErrorText error={error} />
                    </FormControlError>
                </FormControl>
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'column',
                        gap: 12,
                        paddingBottom: 20,
                    }}
                >
                    <AppCheckbox
                        value=""
                        label={AppStrings.rememberSignIn}
                        isChecked={isChecked}
                        onChange={(checked) => setChecked(checked)}
                    />
                    <TextButton text="Забыли пароль?" onPress={() => {}} />
                </View>
                <View style={{ flex: 1, flexDirection: 'column', gap: 8 }}>
                    <AppButton
                        onPress={() => handleSubmit(form.getValues())}
                        text="Войти"
                        isLoading={isLoading}
                    />
                </View>
                <View style={{ flex: 3 }} />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    loginScreenScrollView: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 60,
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
