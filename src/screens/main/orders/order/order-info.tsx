import { ScrollView, StyleSheet } from 'react-native'
import { AppColors } from '../../../../constants/colors'
import { OrderInterface } from '../../../../types/interface/orders'
import Card from '../../../../components/ui/card'
import { HStack, Text, VStack, View } from '@gluestack-ui/themed'
import CalendarIcon from '../../../../components/icons/calendar'
import { formatDate } from '../../../../utils/helpers'
import Divider from '../../../../components/ui/divider'
import AppInput from '../../../../components/ui/input'
import AppStrings from '../../../../constants/strings'
import { AttachmentsCard } from '../components/attachments'

const OrderInfo = ({ order }: { order: OrderInterface }) => {
    return (
        <ScrollView contentContainerStyle={styles.scrollView}>
            <Card>
                <HStack m="$4">
                    <CalendarIcon />
                    <Text ml="$2" fontSize={14} color={AppColors.bodyDark}>
                        {formatDate(order.planned_datetime)}
                    </Text>
                </HStack>
                <Divider />
                <View p="$4">
                    <VStack gap="$2" mb="$6">
                        <AppInput
                            value={`${
                                order.order_name
                                    ? order.order_name
                                    : order.task?.task_name
                            }`}
                            readOnly={true}
                            hint={AppStrings.name}
                            placeholder={AppStrings.name}
                            onChangeText={() => {}}
                        />
                        <AppInput
                            value={`${
                                order.order_description
                                    ? order.order_description
                                    : order.task?.task_description
                            }`}
                            readOnly={true}
                            multiline={true}
                            minHeight={88}
                            textAlignVertical="top"
                            hint={AppStrings.description}
                            placeholder={AppStrings.description}
                            onChangeText={() => {}}
                        />
                    </VStack>
                    <VStack gap="$2" mb="$6">
                        <AppInput
                            value={order.facility.checkpoint.branch.branch_name}
                            readOnly={true}
                            hint={AppStrings.branch}
                            placeholder={AppStrings.branch}
                            onChangeText={() => {}}
                        />
                        <AppInput
                            value={order.facility.checkpoint.checkpoint_name}
                            readOnly={true}
                            hint={AppStrings.checkpoint}
                            placeholder={AppStrings.checkpoint}
                            onChangeText={() => {}}
                        />
                        <AppInput
                            value={order.facility.facility_name}
                            readOnly={true}
                            hint={AppStrings.facility}
                            placeholder={AppStrings.facility}
                            onChangeText={() => {}}
                        />
                    </VStack>
                    <VStack gap="$4" mb="$4">
                        <AppInput
                            value={order.task.category.category_name}
                            readOnly={true}
                            multiline={false}
                            hint={AppStrings.category}
                            placeholder={AppStrings.category}
                            onChangeText={() => {}}
                        />
                        <AppInput
                            value={order.priority.priority_name}
                            readOnly={true}
                            multiline={false}
                            hint={AppStrings.priority}
                            placeholder={AppStrings.priority}
                            onChangeText={() => {}}
                        />
                    </VStack>
                    <AttachmentsCard
                        canDelete={false}
                        canAddMore={false}
                        canAddFiles={false}
                        attachments={order.files}
                    />
                </View>
            </Card>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: AppColors.background,
    },
})

export default OrderInfo
