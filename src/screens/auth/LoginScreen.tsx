import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import AppColors from '../../constants/Colors'
import { useEffect, useState } from 'react'
import AppStrings from '../../constants/Strings'
import AppButton from '../../components/ui/button'
import AppCheckbox from '../../components/AppCheckbox'
import AppTextButton from '../../components/AppTextButton'
import {
    EyeIcon,
    EyeOffIcon,
    FormControl,
    FormControlError,
    FormControlErrorIcon,
} from '@gluestack-ui/themed'
import WarningIcon from '../../components/icons/WarningIcon'
import { useAuthMutation } from '../../redux/api/auth'
import { AuthPayloadInterface } from '../../types/interface/auth'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { setAccessToken, setRefreshToken } from '../../redux/reducers/authSlice'
import AppFormControlErrorText from '../../components/FormControlErrorText'
import AppInput from '../../components/ui/input'

export default function LoginScreen({ navigation }: any) {
    //const [serverHost, onChangeServerHost] = useState(DEFAULT_HOST)
    const [email, onChangeEmail] = useState('')
    const [password, onChangePassword] = useState('')
    const [passwordHidden, setPasswordHidden] = useState(true)

    const [isChecked, setChecked] = useState(true)

    const dispatch = useAppDispatch()
    const [authUser, { data, error, isError, isSuccess, isLoading }] =
        useAuthMutation()

    const handleLogin = () => {
        const authData: AuthPayloadInterface = {
            email: email,
            password: password,
        }

        authUser(authData)
    }

    useEffect(() => {
        if (isSuccess) {
            dispatch(setAccessToken(data?.accessToken))
            dispatch(setRefreshToken(data?.refreshToken))

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
                    {/* <AppInput
                        style={{ marginBottom: 8 }}
                        value={serverHost}
                        onChangeText={onChangeServerHost}
                        hint="Хост"
                        placeholder="0.0.0.0:3000"
                    /> */}
                    <AppInput
                        style={{ marginBottom: 8 }}
                        value={email}
                        onChangeText={onChangeEmail}
                        hint="Email"
                        placeholder="Email"
                    />
                    <AppInput
                        style={{ marginBottom: 8 }}
                        value={password}
                        onChangeText={onChangePassword}
                        hint="Пароль"
                        placeholder="Пароль"
                        secureTextEntry={passwordHidden}
                        trailingIcon={
                            passwordHidden ? <EyeOffIcon /> : <EyeIcon />
                        }
                        onTrailingIconPress={() =>
                            setPasswordHidden(!passwordHidden)
                        }
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
                        label={AppStrings.rememberSignIn}
                        isChecked={isChecked}
                        onChange={(checked) => setChecked(checked)}
                    />
                    <AppTextButton text="Забыли пароль?" onPress={() => {}} />
                </View>
                <View style={{ flex: 1, flexDirection: 'column', gap: 8 }}>
                    <AppButton
                        onPress={handleLogin}
                        text={'Войти'}
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
