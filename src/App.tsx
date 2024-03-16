import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import LoginScreen from './screens/auth/LoginScreen'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { useAppDispatch, useAppSelector } from './hooks/useAppDispatch'
import { fetchRefreshAuth } from './redux/features/AuthSlice'
import NavigationScreen from './screens/main/NavigationScreen'
import CameraScreen from './screens/main/camera/CameraScreen'
import { GluestackUIProvider } from '@gluestack-ui/themed'
import { View } from 'react-native'
import { config } from '@gluestack-ui/config'
import SplashScreen from './screens/splash/splash-screen'
import { useRefreshTokenMutation } from './redux/api/auth'
import { getJWTtokens } from './utils/helpers'
import { setAccessToken } from './redux/reducers/authSlice'

const Stack = createNativeStackNavigator()

export const AppWrapper = () => {
    return (
        <Provider store={store}>
            <GluestackUIProvider config={config}>
                <App />
            </GluestackUIProvider>
        </Provider>
    )
}

function App() {
    const [isLoading, setLoading] = useState<boolean | null>(null)
    const [initialRoute, setInitialRoute] = useState<string>('LoginScreen')

    const dispatch = useAppDispatch()

    const [fetchRefresh, { data: newAccessToken, error, isSuccess }] =
        useRefreshTokenMutation()

    useEffect(() => {
        getJWTtokens().then(({ accessToken, refreshToken }) => {
            console.log(accessToken)
            console.log(refreshToken)

            if (refreshToken) {
                fetchRefresh({ refresh_token: `${refreshToken}` })
                setLoading(true)
            } else if (!accessToken) {
                setLoading(false)
            }
        })
    }, [])

    useEffect(() => {
        if (isSuccess) {
            dispatch(setAccessToken(newAccessToken))
            setInitialRoute('NavigationScreen')
            setLoading(false)
        }
    }, [isSuccess])

    useEffect(() => {
        if (error) {
            setLoading(false)
        }
    }, [error])

    return isLoading === false ? (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{ headerShown: false }}
                initialRouteName={initialRoute}
            >
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Group>
                    <Stack.Screen
                        name="NavigationScreen"
                        component={NavigationScreen}
                    />
                    <Stack.Screen
                        name="CameraScreen"
                        component={CameraScreen}
                    />
                </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>
    ) : (
        <SplashScreen />
    )
}
