import { createNativeStackNavigator } from '@react-navigation/native-stack'
import NotificationsScreen from './notifications-screen'

const Stack = createNativeStackNavigator()

export default function NotificationsNavigationScreen({ navigation }: any) {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="NotificationsScreen"
                component={NotificationsScreen}
            />
            {/* <Stack.Screen
        name='NotificationScreen'
        component={NotificationScreen}
      /> */}
        </Stack.Navigator>
    )
}
