import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ProfileScreen from './profile-screen'
import AppearanceScreen from './appearance-screen'

const Stack = createNativeStackNavigator()

export default function ProfileNavigationScreen() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
            <Stack.Screen
                name="AppearanceScreen"
                component={AppearanceScreen}
            />
        </Stack.Navigator>
    )
}
