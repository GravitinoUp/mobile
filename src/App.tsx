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
    const dispatch = useAppDispatch()
    const auth = useAppSelector((state) => state.auth)

    useEffect(() => {
        if (isLoading === null) {
            setLoading(true)
            dispatch(fetchRefreshAuth())
        } else if (isLoading === true) {
            if (
                auth.isLoading === false &&
                auth.error === null &&
                auth.user !== null
            ) {
                setLoading(false)
            }
        }
    }, [auth])

    useEffect(() => {
        if (auth.error !== null) {
            setLoading(false)
        }
    }, [auth.error])

    return isLoading === false ? (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {auth.user && auth.error === null ? (
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
                ) : (
                    <Stack.Group>
                        <Stack.Screen
                            name="LoginScreen"
                            component={LoginScreen}
                        />
                    </Stack.Group>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    ) : (
        <View />
    )
}
