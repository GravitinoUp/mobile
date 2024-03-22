import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import AuthScreen from './screens/auth/auth-screen'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { useAppDispatch } from './hooks/useAppDispatch'
import NavigationScreen from './screens/main/navigation-screen'
import CameraScreen from './screens/main/camera/camera-screen'
import { GluestackUIProvider } from '@gluestack-ui/themed'
import { config } from '@gluestack-ui/config'
import SplashScreen from './screens/splash/splash-screen'
import { useRefreshTokenMutation } from './redux/api/auth'
import { getJWTtokens } from './utils/helpers'
import { setAccessToken } from './redux/reducers/authSlice'
import { TaskFilterQueryProvider } from './context/tasks/tasks-filter-query'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AppColors } from './constants/colors'

globalThis.userPermissions = []
const Stack = createNativeStackNavigator()

export const AppWrapper = () => {
    const [isLoading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        AsyncStorage.getItem('appearance').then((value) => {
            if (value) {
                AppColors.primary = value
            }
            setLoading(false)
        })
    }, [])

    return (
        !isLoading && (
            <Provider store={store}>
                <GluestackUIProvider config={config}>
                    <TaskFilterQueryProvider>
                        <App />
                    </TaskFilterQueryProvider>
                </GluestackUIProvider>
            </Provider>
        )
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
                <Stack.Screen name="LoginScreen" component={AuthScreen} />
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
