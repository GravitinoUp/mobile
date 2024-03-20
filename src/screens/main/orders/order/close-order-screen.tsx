import { ScrollView, Text } from '@gluestack-ui/themed'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Fragment, useCallback, useState } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import { pick } from 'react-native-document-picker'
import { exists, unlink } from 'react-native-fs'
import { useCameraPermission } from 'react-native-vision-camera'
import { BottomBar } from '../../../../components/ui/bottom-bar'
import AppButton from '../../../../components/ui/button'
import Card from '../../../../components/ui/card'
import AppInput from '../../../../components/ui/input'
import { AppColors } from '../../../../constants/colors'
import AppStrings from '../../../../constants/strings'
import { OrderInterface } from '../../../../types/interface/orders'
import { AttachmentsCard } from '../components/attachments'
import { useAppToast } from '../../../../hooks/use-toast'
import { useFocusEffect } from '@react-navigation/native'

interface CloseOrderScreenProps {
    order: OrderInterface
    navigation: any
    files: string[]
    setFiles: React.Dispatch<React.SetStateAction<string[]>>
    submitOrder: () => void
    isLoading: boolean
}

export default function CloseOrderScreen({
    order,
    navigation,
    files,
    setFiles,
    submitOrder,
    isLoading,
}: CloseOrderScreenProps) {
    const orderData = order

    const { showToast, showErrorToast } = useAppToast()
    const { requestPermission } = useCameraPermission()

    const [comment, onChangeComment] = useState('')

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

        const data = {
            order_id: orderData.order_id,
            comment: comment,
            files: [...files, ...newFiles],
        }

        await AsyncStorage.setItem(
            `order-${orderData.order_id}`,
            JSON.stringify(data)
        )
    }

    const deleteFile = async (index: number) => {
        const newFiles = [...files]
        const deletedFile = newFiles.splice(index, 1)

        setFiles(newFiles)

        const data = {
            order_id: orderData.order_id,
            comment: comment,
            files: newFiles,
        }

        await AsyncStorage.setItem(
            `order-${orderData.order_id}`,
            JSON.stringify(data)
        )
        await unlink(deletedFile[0])
    }

    const deleteEmptyFiles = async (data: any) => {
        for (let i = 0; i < data.files.length; i++) {
            const file = data.files[i]

            const isExists = await exists(file)
            if (!isExists) {
                const fileIndex = data.files.findIndex((f: any) => f === file)
                data.files.splice(fileIndex, 1)

                i--
            }
        }

        await AsyncStorage.setItem(
            `order-${order.order_id}`,
            JSON.stringify(data)
        )

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
                    <AppInput
                        value={comment}
                        multiline={true}
                        hint={AppStrings.comment}
                        placeholder={AppStrings.comment}
                        minHeight={120}
                        textAlignVertical="top"
                        onChangeText={(text) => {
                            onChangeComment(text)
                        }}
                    />
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
                            const result = await requestPermission()

                            if (result) {
                                navigation.navigate('CameraScreen', {
                                    orderID: orderData.order_id,
                                })
                            } else {
                                showErrorToast({
                                    label: AppStrings.cameraAccessError,
                                })
                            }
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
