import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import AppColors from '../../constants/Colors'
import AppTextInput from '../../components/AppTextInput'
import { useEffect, useState } from 'react'
import AppStrings from '../../constants/Strings'
import AppButton from '../../components/AppButton'
import { fetchAuth } from '../../redux/features/AuthSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch'
import { HideIcon } from '../../components/icons/HideIcon'
import AppCheckbox from '../../components/AppCheckbox'
import AppTextButton from '../../components/AppTextButton'
import { DEFAULT_HOST } from '@env'
import {
    FormControl,
    FormControlError,
    FormControlErrorIcon,
    FormControlErrorText,
} from '@gluestack-ui/themed'
import WarningIcon from '../../components/icons/WarningIcon'

export default function LoginScreen({ navigation }: any) {
    const [email, onChangeEmail] = useState('')
    const [password, onChangePassword] = useState('')
    const [isPasswordHidden, onChangePasswordHidden] = useState(true)
    const [serverHost, onChangeServerHost] = useState(DEFAULT_HOST)

    const [isChecked, setChecked] = useState(true)

    const dispatch = useAppDispatch()
    const { error, host } = useAppSelector((state) => state.auth)

    useEffect(() => {
        if (host) {
            onChangeServerHost(host)
        }
    }, [host])

    const handleLogin = () => {
        const params = {
            email: email,
            password: password,
            remember: isChecked,
            host: serverHost,
        }

        dispatch(fetchAuth(params))
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.loginScreenScrollView}>
                <View style={{ flex: 3 }} />
                <Text style={styles.title}>{AppStrings.appName}</Text>
                <Text style={styles.description}>
                    {AppStrings.signInDescription}
                </Text>
                <FormControl
                    isInvalid={error !== null && error !== ''}
                    style={{
                        flex: 1,
                        flexDirection: 'column',
                        paddingBottom: 20,
                    }}
                >
                    <AppTextInput
                        style={{ marginBottom: 8 }}
                        value={serverHost}
                        onChangeText={onChangeServerHost}
                        hint="Хост"
                        placeholder="0.0.0.0:3000"
                    />
                    <AppTextInput
                        style={{ marginBottom: 8 }}
                        value={email}
                        onChangeText={onChangeEmail}
                        hint="Email"
                        placeholder="Email"
                    />
                    <AppTextInput
                        style={{ marginBottom: 8 }}
                        value={password}
                        onChangeText={onChangePassword}
                        hint="Пароль"
                        placeholder="Пароль"
                        secureTextEntry={isPasswordHidden}
                        trailingIcon={<HideIcon />}
                        onTrailingIconPress={() =>
                            onChangePasswordHidden(!isPasswordHidden)
                        }
                    />
                    <FormControlError>
                        <FormControlErrorIcon as={WarningIcon} />
                        <FormControlErrorText>{error}</FormControlErrorText>
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
                    <AppButton onPress={handleLogin} text={'Войти'} />
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
