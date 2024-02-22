import { SafeAreaView } from 'react-native-safe-area-context'
import AppColors from '../../../constants/Colors'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import {
    ChevronLeftIcon,
    IconButton,
    Row,
    ScrollView,
    useToast,
} from 'native-base'
import AppCard from '../../../components/AppCard'
import AppTextInput from '../../../components/AppTextInput'
import AppStrings from '../../../constants/Strings'
import { useEffect, useState } from 'react'
import { BottomBar } from '../../../components/BottomBar'
import AppButton from '../../../components/AppButton'
import { AttachmentsCard, AttachmentsShimmer } from './components/Attachments'
import { useCameraPermission } from 'react-native-vision-camera'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { exists } from 'react-native-fs'
import { pick } from 'react-native-document-picker'
import { OrderInterface } from '../../../types/interface/orders'

export default function CloseOrderScreen({ navigation, route }: any) {
    const order: OrderInterface = route.params.order

    const [comment, onChangeComment] = useState('')
    const { hasPermission, requestPermission } = useCameraPermission()

    const [files, setFiles] = useState<string[]>([])
    const [isLoading, setLoading] = useState(false)
    const toast = useToast()

    useEffect(() => {
        setLoading(true)
        AsyncStorage.getItem(`order-${order.order_id}`).then((value) => {
            if (value !== null) {
                deleteEmptyFiles(JSON.parse(value)).then((newData) => {
                    const data = newData
                    setFiles(data.files)
                    onChangeComment(data.comment)

                    setLoading(false)
                })
            } else {
                setLoading(false)
            }
        })
    }, [])

    useEffect(() => {
        if (route.params.files) {
            setFiles(route.params.files)

            const data = {
                order_id: order.order_id,
                comment: comment,
                files: route.params.files,
            }

            AsyncStorage.setItem(
                `order-${order.order_id}`,
                JSON.stringify(data)
            )
        }
    }, [route.params.files])

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

    const pickImages = async () => {
        let pickedFiles = await pick({
            allowMultiSelection: true,
            type: 'image/*',
            copyTo: 'cachesDirectory',
        })

        if (pickedFiles.length + files.length > 10) {
            pickedFiles = pickedFiles.slice(0, 10 - files.length)
            toast.show({ description: AppStrings.tooManyImages })
        }

        const newFiles: string[] = []
        pickedFiles.forEach((element) => {
            newFiles.push(element.fileCopyUri!)
        })

        setFiles([...files, ...newFiles])

        const data = {
            order_id: order.order_id,
            comment: comment,
            files: [...files, ...newFiles],
        }

        await AsyncStorage.setItem(
            `order-${order.order_id}`,
            JSON.stringify(data)
        )
    }

    const deleteFile = async (index: number) => {
        const newFiles = [...files]
        newFiles.splice(index, 1)

        setFiles(newFiles)
        console.log(newFiles)

        const data = {
            order_id: order.order_id,
            comment: comment,
            files: newFiles,
        }

        await AsyncStorage.setItem(
            `order-${order.order_id}`,
            JSON.stringify(data)
        )

        toast.closeAll()
        toast.show({ description: AppStrings.imageDeleted })
    }

    const closeOrder = async () => {
        await AsyncStorage.removeItem(`order-${order.order_id}`)
        navigation.navigate('HomeScreen')
    }

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: AppColors.background }}
        >
            <View style={styles.header}>
                <Row>
                    <IconButton
                        icon={<ChevronLeftIcon />}
                        _icon={{ color: AppColors.text }}
                        _pressed={{ backgroundColor: AppColors.primaryPressed }}
                        borderRadius={'full'}
                        onPress={() => navigation.goBack()}
                    />
                </Row>
                <Text style={styles.headerTitle}>№{order.order_id}</Text>
            </View>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <AppCard style={styles.cardContent}>
                    <AppTextInput
                        value={comment}
                        multiline={true}
                        hint={AppStrings.comment}
                        placeholder={AppStrings.comment}
                        minHeight="110px"
                        textAlignVertical="top"
                        onChangeText={(text) => {
                            onChangeComment(text)
                        }}
                    />
                    <Text style={{ marginTop: 13, color: AppColors.bodyLight }}>
                        {AppStrings.attachFilesDescription}
                    </Text>
                    {!isLoading ? (
                        <AttachmentsCard
                            style={{ marginTop: 13 }}
                            attachments={files}
                            canDelete={true}
                            canAddMore={true}
                            canAddFiles={true} // TODO Role check
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
                                        files: files,
                                    })
                                }
                            }}
                        />
                    ) : (
                        <AttachmentsShimmer marginTop={13} />
                    )}
                    {/* <AttachmentsShimmer /> */}
                </AppCard>
            </ScrollView>
            <BottomBar
                style={{ alignItems: 'center', justifyContent: 'center' }}
            >
                <AppButton
                    onPress={async () => {
                        // TODO Close order
                        await closeOrder()
                    }}
                    text={'Закрыть задачу'}
                    width={`${Dimensions.get('window').width / 1.5}px`}
                    isDisabled={files.length === 0}
                />
            </BottomBar>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        elevation: 20,
        backgroundColor: AppColors.background,
        paddingHorizontal: 12,
        paddingTop: 16,
        paddingBottom: 30,
        shadowColor: AppColors.shadowColor,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        zIndex: 10,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: '600',
        color: AppColors.text,
        textAlign: 'center',
    },
    scrollView: {
        flexGrow: 1,
        paddingTop: 40,
        paddingBottom: 30,
        paddingHorizontal: 12,
        backgroundColor: AppColors.background,
    },
    cardContent: {
        padding: 16,
    },
})
