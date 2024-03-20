import { SafeAreaView } from 'react-native-safe-area-context'
import { Image, ScrollView, StyleSheet, View } from 'react-native'
import { AppColors } from '../../constants/colors'
import { useEffect, useState } from 'react'
import {
    EyeIcon,
    EyeOffIcon,
    FormControl,
    FormControlError,
    FormControlErrorIcon,
    Text,
    VStack,
} from '@gluestack-ui/themed'
import { useForm } from '../../components/form/form'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAuthMutation } from '../../redux/api/auth'
import { setAccessToken, setRefreshToken } from '../../redux/reducers/authSlice'
import AppStrings from '../../constants/strings'
import { Controller } from 'react-hook-form'
import AppInput from '../../components/ui/input'
import WarningIcon from '../../components/icons/WarningIcon'
import AppFormControlErrorText from '../../components/form/form-control-error-text'
import AppCheckbox from '../../components/ui/checkbox'
import TextButton from '../../components/ui/text-button'
import AppButton from '../../components/ui/button'
import { z } from 'zod'
import { DEFAULT_HOST } from '@env'
import Watermark from '../../components/watermark/watermark'

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
        console.log(DEFAULT_HOST)

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
                <Image
                    style={{
                        width: 'auto',
                        height: 60,
                        objectFit: 'contain',
                        marginBottom: 20,
                    }}
                    source={require('../../components/images/rosgranstroy-logo-main.png')}
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
                    <FormControl
                        isInvalid={isError}
                        style={{
                            flex: 1,
                            flexDirection: 'column',
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
                    <VStack gap="$3" my="$6">
                        <AppCheckbox
                            value=""
                            label={AppStrings.rememberSignIn}
                            isChecked={isChecked}
                            onChange={(checked) => setChecked(checked)}
                        />
                        <TextButton text="Забыли пароль?" onPress={() => {}} />
                    </VStack>
                </VStack>
                <View style={{ flex: 1 }} />
                <AppButton
                    onPress={() => handleSubmit(form.getValues())}
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
