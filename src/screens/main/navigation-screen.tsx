import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { BottomNavBar } from '../../components/ui/bottom-bar'
import {
    FileIcon,
    NotificationsIcon,
    ProfileIcon,
    ReportIcon,
} from '../../components/icons/BottomBarIcons'
import OrdersNavigationScreen from './orders/orders-navigation-screen'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'
import { Fragment, useEffect, useState } from 'react'
import ReportsScreen from './reports/reports-screen'
import NotificationsNavigationScreen from './notifications/notifications-nav-screen'
import ProfileNavigationScreen from './profile/profile-nav-screen'
import ResetPasswordDialog from '../../components/reset-password-dialog/reset-password-dialog'
import { useGetMyUserQuery } from '../../redux/api/users'

const Tab = createBottomTabNavigator()

export default function NavigationScreen() {
    const [isVisible, setVisible] = useState(true)
    const [isOpen, setOpen] = useState(false)

    const { data: user, isSuccess } = useGetMyUserQuery()

    useEffect(() => {
        if (isSuccess) {
            if (user.is_default_password) {
                setOpen(true)
            }
        }
    }, [isSuccess])

    return (
        <Fragment>
            <ResetPasswordDialog isOpen={isOpen} setOpen={setOpen} />
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
                            const routeName =
                                getFocusedRouteNameFromRoute(route)
                            useEffect(() => {
                                if (routeName === 'OrderScreen') {
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
                    name="ReportsScreen"
                    component={ReportsScreen}
                    options={{
                        tabBarIcon: ({ color }) => <ReportIcon color={color} />,
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
                        tabBarIcon: ({ color }) => (
                            <ProfileIcon color={color} />
                        ),
                    }}
                />
            </Tab.Navigator>
        </Fragment>
    )
}
