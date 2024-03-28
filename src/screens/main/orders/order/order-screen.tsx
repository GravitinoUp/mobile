import { Fragment, useCallback, useContext, useEffect, useState } from 'react'
import { HStack, Text, VStack } from '@gluestack-ui/themed'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import {
    Dimensions,
    PermissionsAndroid,
    SafeAreaView,
    StyleSheet,
} from 'react-native'
import { pick } from 'react-native-document-picker'
import { exists, unlink } from 'react-native-fs'
import ImagePicker from 'react-native-image-crop-picker'
import BackButton from '../../../../components/back-button/back-button'
import OrderStatusCard from '../../../../components/order-status-card/order-status-card'
import AppBar, { AppBarTitle } from '../../../../components/ui/app-bar'
import { BottomBar } from '../../../../components/ui/bottom-bar'
import AppButton from '../../../../components/ui/button'
import Card from '../../../../components/ui/card'
import LoadingView from '../../../../components/ui/loading-view'
import { AppColors } from '../../../../constants/colors'
import AppStrings from '../../../../constants/strings'
import { TasksFilterQueryContext } from '../../../../context/tasks/tasks-filter-query'
import useErrorToast from '../../../../hooks/use-error-toast'
import useSuccessToast from '../../../../hooks/use-success-toast'
import { useAppToast } from '../../../../hooks/use-toast'
import {
    useGetPersonalOrdersQuery,
    useUpdateStatusMutation,
    useUploadFileMutation,
} from '../../../../redux/api/orders'
import { UnclosedOrderInterface } from '../../../../types/interface/fetch'
import { AttachmentsCard } from '../components/order-attachments'

export default function OrderScreen({ navigation, route }: any) {
    const orderID: number = route.params.orderID

    const { showToast, showErrorToast } = useAppToast()
    const { personalOrdersQuery } = useContext(TasksFilterQueryContext)
    const {
        data: orders = { count: 0, data: [] },
        isFetching: orderFetching,
        isSuccess: orderSuccess,
        error: orderError,
    } = useGetPersonalOrdersQuery({
        ...personalOrdersQuery,
        filter: { order_id: orderID },
    })

    const [files, setFiles] = useState<string[]>([])

    const [
        closeOrder,
        { isLoading: orderClosing, isSuccess: closeSuccess, error: closeError },
    ] = useUpdateStatusMutation()

    const [
        uploadFiles,
        {
            isLoading: orderUploading,
            isSuccess: uploadSuccess,
            error: uploadError,
        },
    ] = useUploadFileMutation()

    const submitOrder = () => {
        const formData = new FormData()
        files.forEach((value) => {
            formData.append('files', {
                uri: value,
                name: value.split('/').pop(),
                type: `image/${value.split('.').pop()}`,
            })
        })

        uploadFiles({
            orderIDs: [orderID],
            directory: 'orders',
            formData,
        })
    }

    const pickImages = async () => {
        let pickedFiles = await pick({
            allowMultiSelection: true,
            type: 'image/*',
            copyTo: 'cachesDirectory',
        })

        if (pickedFiles.length + files.length > 10) {
            pickedFiles = pickedFiles.slice(0, 10 - files.length)
            showToast({ label: AppStrings.tooManyImages })
        }

        const newFiles: string[] = []
        pickedFiles.forEach((element) => {
            newFiles.push(element.fileCopyUri!)
        })

        setFiles([...files, ...newFiles])

        const data: UnclosedOrderInterface = {
            order_id: orderID,
            order_name: `${orders.data[0].order_name}`,
            files: [...files, ...newFiles],
        }

        await AsyncStorage.setItem(`order-${orderID}`, JSON.stringify(data))
    }

    const takePhoto = async () => {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                title: 'Доступ к камере',
                message:
                    'Для прикрепления изображений к задаче необходим доступ к камере устройства',
                buttonNegative: 'Отменить',
                buttonPositive: 'OK',
            }
        )

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            const result = await ImagePicker.openCamera({
                compressImageQuality: 0.5,
            })

            const storedData: UnclosedOrderInterface = {
                order_id: orderID,
                order_name: `${orders.data[0].order_name}`,
                files: [],
            }
            const jsonStoredFiles = await AsyncStorage.getItem(
                `order-${orders.data[0].order_id}`
            )
            if (jsonStoredFiles !== null) {
                storedData.files = JSON.parse(jsonStoredFiles).files
            }

            if (result.path) {
                storedData.files = [...storedData.files, result.path]
            }

            await AsyncStorage.setItem(
                `order-${orders.data[0].order_id}`,
                JSON.stringify(storedData)
            )

            setFiles(storedData.files)
        } else {
            showErrorToast({ label: AppStrings.cameraAccessError })
        }
    }

    const deleteFile = async (index: number) => {
        const newFiles = [...files]
        const deletedFile = newFiles.splice(index, 1)

        setFiles(newFiles)

        const data: UnclosedOrderInterface = {
            order_id: orderID,
            order_name: `${orders.data[0].order_name}`,
            files: newFiles,
        }

        if (newFiles.length > 0) {
            await AsyncStorage.setItem(`order-${orderID}`, JSON.stringify(data))
        } else {
            await AsyncStorage.removeItem(`order-${orderID}`)
        }

        await unlink(deletedFile[0])
    }

    const deleteEmptyFiles = async (data: UnclosedOrderInterface) => {
        for (let i = 0; i < data.files.length; i++) {
            const file = data.files[i]

            const isExists = await exists(file)
            if (!isExists) {
                const fileIndex = data.files.findIndex((f: any) => f === file)
                data.files.splice(fileIndex, 1)

                i--
            }
        }

        if (data.files.length > 0) {
            await AsyncStorage.setItem(`order-${orderID}`, JSON.stringify(data))
        } else {
            await AsyncStorage.removeItem(`order-${orderID}`)
        }

        return data
    }

    useFocusEffect(
        useCallback(() => {
            AsyncStorage.getItem(`order-${orderID}`).then((value) => {
                if (value !== null) {
                    deleteEmptyFiles(JSON.parse(value)).then((newData) => {
                        setFiles(newData.files)
                    })
                }
            })
        }, [])
    )

    useEffect(() => {
        if (uploadSuccess) {
            closeOrder({ order_id: orderID, order_status_id: '4' })
        }
    }, [uploadSuccess])

    useEffect(() => {
        if (closeSuccess) {
            AsyncStorage.removeItem(`order-${orderID}`).then(() => {
                navigation.navigate('HomeScreen')
            })
        }
    }, [closeSuccess])

    useSuccessToast('Задача успешно закрыта!', closeSuccess)
    useErrorToast(orderError || closeError || uploadError)

    return (
        <Fragment>
            <SafeAreaView
                style={{ flex: 1, backgroundColor: AppColors.background }}
            >
                <AppBar style={styles.header}>
                    <HStack justifyContent="space-between" alignItems="center">
                        <BackButton navigation={navigation} />
                        {!orderFetching && (
                            <OrderStatusCard
                                orderStatus={
                                    orders.data[0].order_status
                                        .order_status_name
                                }
                            />
                        )}
                    </HStack>
                    <AppBarTitle>
                        {!orderFetching
                            ? `№${orders.data[0].order_id}`
                            : AppStrings.loading}
                    </AppBarTitle>
                </AppBar>
                {!orderFetching && orderSuccess ? (
                    <Card
                        style={{
                            padding: 16,
                            margin: 16,
                            backgroundColor: AppColors.background,
                        }}
                    >
                        {orders.data[0] &&
                            orders.data[0].order_status.order_status_id ===
                                3 && (
                                <VStack mb="$4">
                                    <Text color={AppColors.bodyLight}>
                                        {AppStrings.attachFilesDescription}
                                    </Text>
                                    <AttachmentsCard
                                        style={{ marginTop: 12 }}
                                        attachments={files}
                                        canDelete={true}
                                        canAddMore={true}
                                        canAddFiles={false}
                                        onAddFilePress={async () => {
                                            await pickImages()
                                        }}
                                        onFileDeletePress={async (index) => {
                                            await deleteFile(index)
                                        }}
                                        onMakePhotoPress={async () => {
                                            await takePhoto()
                                        }}
                                    />
                                </VStack>
                            )}
                        <Text>
                            <Text fontSize="$md" color={AppColors.bodyLight}>
                                {`${AppStrings.name}: `}
                            </Text>
                            <Text fontSize="$lg" fontWeight="$medium">
                                {orders.data[0].order_name}
                            </Text>
                        </Text>
                        <Text>
                            <Text fontSize="$md" color={AppColors.bodyLight}>
                                {`${AppStrings.description}: `}
                            </Text>
                            <Text fontSize="$lg" fontWeight="$medium">
                                {orders.data[0].order_description}
                            </Text>
                        </Text>
                        <Text mt="$3">
                            <Text fontSize="$md" color={AppColors.bodyLight}>
                                {`${AppStrings.checkpoint}: `}
                            </Text>
                            <Text fontSize="$lg" fontWeight="$medium">
                                {
                                    orders.data[0].facility.checkpoint
                                        .checkpoint_name
                                }
                            </Text>
                        </Text>
                        <Text>
                            <Text fontSize="$md" color={AppColors.bodyLight}>
                                {`${AppStrings.facility}: `}
                            </Text>
                            <Text fontSize="$lg" fontWeight="$medium">
                                {orders.data[0].facility.facility_name}
                            </Text>
                        </Text>
                        <AttachmentsCard
                            style={{ marginTop: 16 }}
                            canDelete={false}
                            canAddMore={false}
                            canAddFiles={false}
                            attachments={orders.data[0].files}
                        />
                    </Card>
                ) : (
                    <LoadingView />
                )}
            </SafeAreaView>
            {orders.data[0] &&
                orders.data[0].order_status.order_status_id === 3 && (
                    <BottomBar
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <AppButton
                            onPress={submitOrder}
                            text={AppStrings.closeOrder}
                            width={Dimensions.get('window').width / 1.5}
                            isDisabled={files.length === 0}
                            isLoading={orderClosing || orderUploading}
                        />
                    </BottomBar>
                )}
        </Fragment>
    )
}

const styles = StyleSheet.create({
    header: {
        paddingTop: 8,
        paddingBottom: 16,
        paddingHorizontal: 16,
        elevation: 12,
        shadowColor: AppColors.text,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
})
