import { createNativeStackNavigator } from '@react-navigation/native-stack'
import OrderScreen from './order/order-screen'
import OrdersScreen from './orders-screen'

const Stack = createNativeStackNavigator()

export default function OrdersNavigationScreen() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeScreen" component={OrdersScreen} />
            <Stack.Screen name="OrderScreen" component={OrderScreen} />
        </Stack.Navigator>
    )
}
