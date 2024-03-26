import { Fragment, useCallback } from 'react'
import { ScrollView, Text } from '@gluestack-ui/themed'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import { Dimensions, PermissionsAndroid, StyleSheet } from 'react-native'
import { pick } from 'react-native-document-picker'
import { exists, moveFile, unlink } from 'react-native-fs'
import { launchCamera } from 'react-native-image-picker'
import { BottomBar } from '../../../../components/ui/bottom-bar'
import AppButton from '../../../../components/ui/button'
import Card from '../../../../components/ui/card'
import { AppColors } from '../../../../constants/colors'
import AppStrings from '../../../../constants/strings'
import { useAppToast } from '../../../../hooks/use-toast'
import { UnclosedOrderInterface } from '../../../../types/interface/fetch'
import { OrderInterface } from '../../../../types/interface/orders'
import { AttachmentsCard } from '../components/attachments'

interface CloseOrderScreenProps {
    order: OrderInterface
    files: string[]
    setFiles: React.Dispatch<React.SetStateAction<string[]>>
    submitOrder: () => void
    isLoading: boolean
}

export default function CloseOrderScreen({
    order,
    files,
    setFiles,
    submitOrder,
    isLoading,
}: CloseOrderScreenProps) {
    const orderData = order

    const { showToast, showErrorToast } = useAppToast()

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
            order_id: orderData.order_id,
            order_name: `${orderData.order_name}`,
            files: [...files, ...newFiles],
        }

        await AsyncStorage.setItem(
            `order-${orderData.order_id}`,
            JSON.stringify(data)
        )
    }

    const takePhoto = async () => {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                title: 'Доступ к камере',
                message:
                    'Для прикрепления изображений к задаче необходимо выдать доступ к камере',
                buttonNegative: 'Отменить',
                buttonPositive: 'OK',
            }
        )

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            const result = await launchCamera({
                mediaType: 'photo',
            })

            const storedData: UnclosedOrderInterface = {
                order_id: order.order_id,
                order_name: `${order.order_name}`,
                files: [],
            }
            const jsonStoredFiles = await AsyncStorage.getItem(
                `order-${order.order_id}`
            )
            if (jsonStoredFiles !== null) {
                storedData.files = JSON.parse(jsonStoredFiles).files
            }

            if (result.assets) {
                for (const asset of result.assets) {
                    if (asset.originalPath) {
                        const newUri = asset.originalPath.replace(
                            'rn_image_picker_lib_temp_',
                            'gravitino-'
                        )

                        console.log(asset.originalPath)
                        console.log(newUri)

                        await moveFile(asset.originalPath, newUri)

                        storedData.files = [...storedData.files, newUri]
                    }
                }
            }

            await AsyncStorage.setItem(
                `order-${order.order_id}`,
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
            order_id: orderData.order_id,
            order_name: `${orderData.order_name}`,
            files: newFiles,
        }

        if (newFiles.length > 0) {
            await AsyncStorage.setItem(
                `order-${orderData.order_id}`,
                JSON.stringify(data)
            )
        } else {
            await AsyncStorage.removeItem(`order-${orderData.order_id}`)
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
            await AsyncStorage.setItem(
                `order-${order.order_id}`,
                JSON.stringify(data)
            )
        } else {
            await AsyncStorage.removeItem(`order-${order.order_id}`)
        }

        return data
    }

    useFocusEffect(
        useCallback(() => {
            AsyncStorage.getItem(`order-${order.order_id}`).then((value) => {
                if (value !== null) {
                    deleteEmptyFiles(JSON.parse(value)).then((newData) => {
                        setFiles(newData.files)
                    })
                }
            })
        }, [])
    )

    return (
        <Fragment>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <Card style={{ padding: 16 }}>
                    <Text mt="$3" color={AppColors.bodyLight}>
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
                </Card>
            </ScrollView>
            <BottomBar
                style={{ alignItems: 'center', justifyContent: 'center' }}
            >
                <AppButton
                    onPress={submitOrder}
                    text={AppStrings.closeOrder}
                    width={Dimensions.get('window').width / 1.5}
                    isDisabled={files.length === 0}
                    isLoading={isLoading}
                />
            </BottomBar>
        </Fragment>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: AppColors.background,
    },
})
