import { SafeAreaView } from 'react-native-safe-area-context'
import { AppColors } from '../../../../constants/colors'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import Card from '../../../../components/ui/card'
import CalendarIcon from '../../../../components/icons/calendar'
import AppInput from '../../../../components/ui/input'
import AppStrings from '../../../../constants/strings'
import AppButton from '../../../../components/ui/button'
import { AttachmentsCard } from '../components/attachments'
import AppBar from '../../../../components/ui/app-bar'
import { OrderInterface } from '../../../../types/interface/orders'
import { HStack, VStack } from '@gluestack-ui/themed'
import { formatDate } from '../../../../utils/helpers'
import OrderStatusCard from '../../../../components/order-status-card/order-status-card'
import BackButton from '../../../../components/back-button/back-button'

export default function OrderScreen({ navigation, route }: any) {
    const order: OrderInterface = route.params.order

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: AppColors.background }}
        >
            <AppBar style={styles.header}>
                <HStack justifyContent="space-between" alignItems="center">
                    <BackButton navigation={navigation} />
                    <OrderStatusCard
                        orderStatus={order.order_status.order_status_name}
                    />
                </HStack>
                <Text style={styles.headerTitle}>№{order.order_id}</Text>
            </AppBar>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <Card>
                    <View style={styles.topRow}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <CalendarIcon />
                            <Text
                                style={{
                                    marginLeft: 6,
                                    fontSize: 14,
                                    color: AppColors.bodyDark,
                                }}
                            >
                                {formatDate(order.planned_datetime)}
                            </Text>
                        </View>
                    </View>
                    <View
                        style={{
                            height: 1,
                            width: '100%',
                            borderRadius: 1,
                            borderWidth: 1,
                            borderColor: AppColors.border,
                            borderStyle: 'dashed',
                        }}
                    />
                    <View style={styles.cardContent}>
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
                                value={
                                    order.facility.checkpoint.branch.branch_name
                                }
                                readOnly={true}
                                hint={AppStrings.branch}
                                placeholder={AppStrings.branch}
                                onChangeText={() => {}}
                            />
                            <AppInput
                                value={
                                    order.facility.checkpoint.checkpoint_name
                                }
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
                        <AppButton
                            style={styles.bottomButton}
                            onPress={() => {
                                navigation.navigate('CloseOrderScreen', {
                                    order: order,
                                })
                            }}
                            text={AppStrings.closeOrder}
                            px={40}
                            py={10}
                        />
                    </View>
                </Card>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        paddingTop: 8,
        paddingBottom: 16,
        paddingHorizontal: 16,
        elevation: 20,
        shadowColor: AppColors.text,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: '600',
        color: AppColors.text,
        textAlign: 'center',
    },
    scrollView: {
        flexGrow: 1,
        paddingTop: 16,
        paddingBottom: 30,
        paddingHorizontal: 16,
        backgroundColor: AppColors.background,
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 16,
    },
    cardContent: {
        padding: 16,
    },
    bottomButton: {
        top: 36,
        marginHorizontal: 40,
    },
})
