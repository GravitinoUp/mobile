import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { BottomNavBar } from '../../components/ui/bottom-bar'
import {
    ArchiveIcon,
    FileIcon,
    NotificationsIcon,
    ProfileIcon,
} from '../../components/icons/BottomBarIcons'
import OrdersNavigationScreen from './orders/OrdersNavigationScreen'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import ArchiveScreen from './archive/ArchiveScreen'
import NotificationsNavigationScreen from './notifications/NotificationsNavigationScreen'
import ProfileNavigationScreen from './profile/ProfileNavigationScreen'

const Tab = createBottomTabNavigator()

export default function NavigationScreen({ navigation, route }: any) {
    const [isVisible, setVisible] = useState(true)

    return (
        <Tab.Navigator
            screenOptions={{ headerShown: false }}
            tabBar={(props) => (
                <BottomNavBar props={props} isVisible={isVisible} />
            )}
        >
            <Tab.Screen
                name="OrdersNavigationScreen"
                component={OrdersNavigationScreen}
                options={({ route }) => ({
                    tabBarIcon: ({ color }) => {
                        const routeName = getFocusedRouteNameFromRoute(route)
                        useEffect(() => {
                            if (routeName === 'CloseOrderScreen') {
                                setVisible(false)
                            } else {
                                setVisible(true)
                            }
                        }, [route])

                        return <FileIcon color={color} />
                    },
                })}
            />
            <Tab.Screen
                name="ArchiveScreen"
                component={ArchiveScreen}
                options={{
                    tabBarIcon: ({ color }) => <ArchiveIcon color={color} />,
                }}
            />
            <Tab.Screen
                name="NotificationsNavigationScreen"
                component={NotificationsNavigationScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <NotificationsIcon color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="ProfileNavigationScreen"
                component={ProfileNavigationScreen}
                options={{
                    tabBarIcon: ({ color }) => <ProfileIcon color={color} />,
                }}
            />
        </Tab.Navigator>
    )
}
