import { HStack, Text, VStack } from '@gluestack-ui/themed'
import { AppColors } from '../../constants/colors'
import AppStrings from '../../constants/strings'
import { UnclosedOrderInterface } from '../../types/interface/fetch'
import AppButton from '../ui/button'
import Dialog from '../ui/dialog'

type UploadDialogProps = {
    isOpen: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    unclosedOrders: UnclosedOrderInterface[]
    handleUpload: () => void
    loading: boolean
}

const UploadDialog = ({
    isOpen,
    setOpen,
    unclosedOrders,
    handleUpload,
    loading,
}: UploadDialogProps) => (
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
                    isLoading={loading}
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

export default UploadDialog
