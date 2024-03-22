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
import NotificationsNavigationScreen from './notifications/notifications-nav-screen'
import ProfileNavigationScreen from './profile/profile-nav-screen'
import ResetPasswordDialog from '../../components/reset-password-dialog/reset-password-dialog'
import { useGetMyUserQuery } from '../../redux/api/users'
import { useGetPersonalPermissionsQuery } from '../../redux/api/permissions'
import { PermissionEnum } from '../../constants/permissions.enum'
import { ADMIN_ROLE_ID } from '../../constants/constants'
import { checkPermissions } from '../../utils/helpers'
import SplashScreen from '../splash/splash-screen'
import ReportsNavigationScreen from './reports/reports-navigation-screen'

const Tab = createBottomTabNavigator()

export default function NavigationScreen() {
    const [isVisible, setVisible] = useState(true)
    const [isOpen, setOpen] = useState(false)

    const { data: user, isSuccess: userSuccess } = useGetMyUserQuery()
    const { data: permissions, isSuccess: permissionsSuccess } =
        useGetPersonalPermissionsQuery()

    useEffect(() => {
        if (userSuccess && permissionsSuccess) {
            if (user.is_default_password) {
                setOpen(true)
            }

            globalThis.userPermissions.length = 0
            globalThis.userPermissions.push(
                ...permissions.map((value) => ({
                    permission_name: value.permission.permission_name,
                    permission_description:
                        value.permission.permission_description,
                    permission_sku: value.permission.permission_sku,
                    rights: value.rights,
                }))
            )

            if (user.role.role_id === ADMIN_ROLE_ID) {
                globalThis.userPermissions.unshift({
                    permission_name: 'ADMIN',
                    permission_description: '',
                    permission_sku: 'admin',
                    rights: user.role.role_id === ADMIN_ROLE_ID,
                })
            }
        }
    }, [userSuccess, permissionsSuccess])

    return userSuccess && permissionsSuccess ? (
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
                {checkPermissions([PermissionEnum.ReportBranchCreate]) && (
                    <Tab.Screen
                        name="ReportsNavigationScreen"
                        component={ReportsNavigationScreen}
                        options={{
                            tabBarIcon: ({ color }) => (
                                <ReportIcon color={color} />
                            ),
                        }}
                    />
                )}
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
    ) : (
        <SplashScreen />
    )
}
