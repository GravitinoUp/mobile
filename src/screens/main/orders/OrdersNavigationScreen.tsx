import { createNativeStackNavigator } from '@react-navigation/native-stack'
import OrderScreen from './order-screen'
import CloseOrderScreen from './close-order-screen'
import OrdersScreen from './orders-screen'

const Stack = createNativeStackNavigator()

export default function OrdersNavigationScreen({ navigation }: any) {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeScreen" component={OrdersScreen} />
            <Stack.Screen name="OrderScreen" component={OrderScreen} />
            <Stack.Screen
                name="CloseOrderScreen"
                component={CloseOrderScreen}
            />
        </Stack.Navigator>
    )
}
