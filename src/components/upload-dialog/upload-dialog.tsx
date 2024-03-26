import { HStack, Text, VStack } from '@gluestack-ui/themed'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AppColors } from '../../constants/colors'
import AppStrings from '../../constants/strings'
import useErrorToast from '../../hooks/use-error-toast'
import useSuccessToast from '../../hooks/use-success-toast'
import {
    useUpdateStatusMutation,
    useUploadFileMutation,
} from '../../redux/api/orders'
import { UnclosedOrderInterface } from '../../types/interface/fetch'
import AppButton from '../ui/button'
import Dialog from '../ui/dialog'

type UploadDialogProps = {
    isOpen: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    unclosedOrders: UnclosedOrderInterface[]
    setUnclosedOrders: React.Dispatch<
        React.SetStateAction<UnclosedOrderInterface[]>
    >
}

const UploadDialog = ({
    isOpen,
    setOpen,
    unclosedOrders,
    setUnclosedOrders,
}: UploadDialogProps) => {
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

    const handleUpload = async () => {
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

        const uploadResults = await Promise.allSettled(uploadPromises)
        for (let index = 0; index < uploadResults.length; index++) {
            const result = uploadResults[index]

            console.log(result)
            if (
                (result.status === 'fulfilled' &&
                    result.value.status === false) ||
                result.status === 'rejected'
            ) {
                setUnclosedOrders([
                    ...unclosedOrders.filter(
                        (o) => o.order_id !== unclosedOrders[index].order_id
                    ),
                ])
            }
        }

        const closePromises = unclosedOrders.map((value) =>
            closeOrder({
                order_id: value.order_id,
                order_status_id: '4',
            }).unwrap()
        )

        const closeResults = await Promise.allSettled(closePromises)
        for (let index = 0; index < closeResults.length; index++) {
            const result = closeResults[index]

            console.log(result)
            if (result.status === 'fulfilled' && result.value.status) {
                await AsyncStorage.removeItem(
                    `order-${unclosedOrders[index].order_id}`
                )
            } else {
                setUnclosedOrders([
                    ...unclosedOrders.filter(
                        (o) => o.order_id !== unclosedOrders[index].order_id
                    ),
                ])
            }
        }

        setOpen(false)
    }

    useSuccessToast(AppStrings.orderClosed, uploadSuccess && closeSuccess)
    useErrorToast(uploadError || closeError)

    return (
        <Dialog
            title={AppStrings.uploadTitle}
            isOpen={isOpen}
            setOpen={setOpen}
            footer={
                <HStack gap="$2">
                    <AppButton
                        style={{ flex: 1 }}
                        text={AppStrings.cancel}
                        textProps={{
                            color: AppColors.text,
                            fontSize: '$sm',
                            fontWeight: '$normal',
                        }}
                        bgColor={AppColors.transparent}
                        onPress={() => setOpen(false)}
                    />
                    <AppButton
                        style={{ flex: 1 }}
                        textProps={{
                            fontSize: '$sm',
                            fontWeight: '$normal',
                        }}
                        text={AppStrings.upload}
                        onPress={async () => await handleUpload()}
                        isLoading={orderUploading || orderClosing}
                    />
                </HStack>
            }
            dismissable={false}
        >
            <VStack>
                <Text>{AppStrings.uploadDescription}</Text>
                <Text mt="$2" mb="$1" fontWeight="$medium">
                    Список незакрытых задач:
                </Text>
                {unclosedOrders.map((value) => (
                    <Text key={value.order_id}>
                        <Text fontWeight="$medium">№{value.order_id}</Text>
                        <Text> {value.order_name}</Text>
                    </Text>
                ))}
            </VStack>
        </Dialog>
    )
}

export default UploadDialog
