import { Fragment, useEffect, useState } from 'react'
import { Spinner, View } from '@gluestack-ui/themed'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native'
import NotificationsNavigationScreen from './notifications/notifications-nav-screen'
import OrdersNavigationScreen from './orders/orders-navigation-screen'
import ProfileNavigationScreen from './profile/profile-nav-screen'
import ReportsNavigationScreen from './reports/reports-navigation-screen'
import {
    FileIcon,
    NotificationsIcon,
    ProfileIcon,
    ReportIcon,
} from '../../components/icons/BottomBarIcons'
import { UploadIcon } from '../../components/icons/UploadIcon'
import ResetPasswordDialog from '../../components/reset-password-dialog/reset-password-dialog'
import { BottomNavBar } from '../../components/ui/bottom-bar'
import UploadDialog from '../../components/upload-dialog/upload-dialog'
import { AppColors } from '../../constants/colors'
import { ADMIN_ROLE_ID } from '../../constants/constants'
import { PermissionEnum } from '../../constants/permissions.enum'
import useSuccessToast from '../../hooks/use-success-toast'
import { useAppToast } from '../../hooks/use-toast'
import {
    useUpdateStatusMutation,
    useUploadFileMutation,
} from '../../redux/api/orders'
import { useGetPersonalPermissionsQuery } from '../../redux/api/permissions'
import { useGetMyUserQuery } from '../../redux/api/users'
import { UnclosedOrderInterface } from '../../types/interface/fetch'
import { checkPermissions } from '../../utils/helpers'
import SplashScreen from '../splash/splash-screen'

const Tab = createBottomTabNavigator()

export default function NavigationScreen() {
    const { showToast, showErrorToast } = useAppToast()

    const [isVisible, setVisible] = useState(true)
    const [isOpen, setOpen] = useState(false)
    const [isUploadDialogOpen, setUploadDialogOpen] = useState(false)

    const [uploadComplete, setUploadComplete] = useState(false)

    const [unclosedOrders, setUnclosedOrders] = useState<
        UnclosedOrderInterface[]
    >([])

    const { data: user, isSuccess: userSuccess } = useGetMyUserQuery()
    const { data: permissions, isSuccess: permissionsSuccess } =
        useGetPersonalPermissionsQuery()

    const [
        closeOrder,
        {
            isLoading: orderClosing,
            isSuccess: closeSuccess,
            isError: closeError,
        },
    ] = useUpdateStatusMutation()

    const [
        uploadFiles,
        {
            isLoading: orderUploading,
            isSuccess: uploadSuccess,
            isError: uploadError,
        },
    ] = useUploadFileMutation()

    const handleUpload = async () => {
        setUploadDialogOpen(false)

        showToast({
            label: 'Отправка файлов на сервер началась. Не закрывайте приложение, пока идёт отправка файлов.',
        })

        const uploadPromises = unclosedOrders.map((value) => {
            const formData = new FormData()

            value.files.forEach((file) => {
                formData.append('files', {
                    uri: file,
                    name: file.split('/').pop(),
                    type: `image/${file.split('.').pop()}`,
                })
            })

            return uploadFiles({
                orderIDs: [value.order_id],
                directory: 'orders',
                formData,
            }).unwrap()
        })

        const updatedOrders: UnclosedOrderInterface[] = [...unclosedOrders]
        const uploadResults = await Promise.allSettled(uploadPromises)
        for (let index = 0; index < uploadResults.length; index++) {
            const result = uploadResults[index]
            console.log(`UPLOAD ${unclosedOrders[index].order_id}`)
            console.log(`UPLOAD ${result.status}`)

            if (
                (result.status === 'fulfilled' &&
                    result.value.status === false) ||
                result.status === 'rejected'
            ) {
                updatedOrders[index].uploadError = true
            } else {
                updatedOrders[index].uploadError = false
            }
        }

        setUnclosedOrders([...updatedOrders])
        setUploadComplete(true)
    }

    const handleClose = async () => {
        const filteredUnclosedOrders = [
            ...unclosedOrders.filter((v) => !v.uploadError),
        ]
        console.log(filteredUnclosedOrders)

        const closePromises = filteredUnclosedOrders.map((value) =>
            closeOrder({
                order_id: value.order_id,
                order_status_id: '4',
            }).unwrap()
        )

        const updatedOrders = [...unclosedOrders]
        const closeResults = await Promise.allSettled(closePromises)
        for (let index = 0; index < closeResults.length; index++) {
            console.log(`CLOSE ${filteredUnclosedOrders[index].order_id}`)

            await AsyncStorage.removeItem(
                `order-${filteredUnclosedOrders[index].order_id}`
            )
            const i = updatedOrders.findIndex(
                (v) => v.order_id === filteredUnclosedOrders[index].order_id
            )
            updatedOrders.splice(i, 1)
        }

        setUnclosedOrders([...updatedOrders])
        setUploadComplete(false)
    }

    useEffect(() => {
        if (uploadComplete) {
            handleClose()
        }
    }, [uploadComplete])

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

    useEffect(() => {
        AsyncStorage.getAllKeys().then((keys) => {
            const unclosedKeys = keys.filter((value) =>
                value.includes('order-')
            )

            const uOrders: UnclosedOrderInterface[] = []
            AsyncStorage.multiGet(unclosedKeys).then((orders) => {
                orders.map((value) => {
                    if (value[1]) {
                        const parsedValue = JSON.parse(value[1]!)
                        uOrders.push(parsedValue)
                    }
                })

                setUnclosedOrders(uOrders)

                if (uOrders.length > 0) {
                    setUploadDialogOpen(true)
                }
            })
        })
    }, [])

    useEffect(() => {
        if (closeError || uploadError) {
            showErrorToast({
                label: 'При закрытии некоторых задач произошла ошибка. Повторите ещё раз.',
            })
        }
    }, [closeError || uploadError])

    useSuccessToast(
        'Отправка файлов успешно завершена! Задачи отправлены на проверку.',
        uploadSuccess && closeSuccess
    )

    return userSuccess && permissionsSuccess ? (
        <Fragment>
            <ResetPasswordDialog isOpen={isOpen} setOpen={setOpen} />
            <UploadDialog
                isOpen={isUploadDialogOpen}
                setOpen={setUploadDialogOpen}
                unclosedOrders={unclosedOrders}
                handleUpload={async () => await handleUpload()}
                loading={orderUploading || orderClosing}
            />
            <Tab.Navigator
                screenOptions={{ headerShown: false }}
                tabBar={(props) => (
                    <View>
                        {unclosedOrders.length > 0 && isVisible && (
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => setUploadDialogOpen(true)}
                            >
                                <View
                                    position="absolute"
                                    top={-62}
                                    right={10}
                                    py="$4"
                                    px="$4"
                                    height="auto"
                                    bgColor={AppColors.primary}
                                    borderRadius="$full"
                                    zIndex={100}
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <View
                                        w="$5"
                                        h="$5"
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        {orderClosing || orderUploading ? (
                                            <Spinner
                                                color={AppColors.background}
                                            />
                                        ) : (
                                            <UploadIcon
                                                color={AppColors.background}
                                            />
                                        )}
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                        <BottomNavBar props={props} isVisible={isVisible} />
                    </View>
                )}
            >
                <Tab.Screen
                    name="OrdersNavigationScreen"
                    component={OrdersNavigationScreen}
                    options={({ route }) => ({
                        tabBarIcon: ({ color }) => {
                            const routeName =
                                getFocusedRouteNameFromRoute(route)
                            // eslint-disable-next-line react-hooks/rules-of-hooks
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
