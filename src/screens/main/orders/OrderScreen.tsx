import { SafeAreaView } from 'react-native-safe-area-context'
import { AppColors } from '../../../constants/colors'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import Card from '../../../components/ui/card'
import CalendarIcon from '../../../components/icons/calendar'
import AppInput from '../../../components/ui/input'
import AppStrings from '../../../constants/strings'
import AppButton from '../../../components/ui/button'
import { AttachmentsCard } from './components/Attachments'
import AppBar from '../../../components/ui/app-bar'
import { OrderInterface } from '../../../types/interface/orders'
import { ChevronLeftIcon, HStack } from '@gluestack-ui/themed'
import IconButton from '../../../components/icon-button/icon-button'
import { formatDate } from '../../../utils/helpers'
import OrderStatusCard from '../../../components/order-status-card/order-status-card'

export default function OrderScreen({ navigation, route }: any) {
    const order: OrderInterface = route.params.order

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: AppColors.background }}
        >
            <AppBar style={styles.header}>
                <HStack justifyContent="space-between" alignItems="center">
                    <IconButton
                        icon={<ChevronLeftIcon size="lg" />}
                        onPress={() => navigation.goBack()}
                    />
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
                        <View
                            style={{
                                gap: 4,
                                flexDirection: 'column',
                                paddingBottom: 16,
                            }}
                        >
                            <AppInput
                                value={`${
                                    order.order_name
                                        ? order.order_name
                                        : order.task?.task_name
                                }`}
                                readOnly={true}
                                hint={AppStrings.workType}
                                placeholder={AppStrings.workType}
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
                                hint={AppStrings.workTypeDescription}
                                placeholder={AppStrings.workTypeDescription}
                                onChangeText={() => {}}
                            />
                        </View>
                        <View style={{ gap: 16, flexDirection: 'column' }}>
                            <AppInput
                                value={`${order.facility?.checkpoint?.branch?.branch_name}`}
                                readOnly={true}
                                multiline={false}
                                hint={AppStrings.branch}
                                placeholder={AppStrings.branch}
                                onChangeText={() => {}}
                            />
                            <AppInput
                                value={`${order.task?.category?.category_name}`}
                                readOnly={true}
                                multiline={false}
                                hint={AppStrings.category}
                                placeholder={AppStrings.category}
                                onChangeText={() => {}}
                            />
                            <AppInput
                                value={`${order.priority?.priority_name}`}
                                readOnly={true}
                                multiline={false}
                                hint={AppStrings.priority}
                                placeholder={AppStrings.priority}
                                onChangeText={() => {}}
                            />
                            <AttachmentsCard
                                canDelete={false}
                                canAddMore={false}
                                canAddFiles={false}
                                attachments={[
                                    'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=',
                                    'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=',
                                    'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=',
                                ]}
                            />
                        </View>
                        <AppButton
                            style={styles.bottomButton}
                            onPress={() => {
                                navigation.navigate('CloseOrderScreen', {
                                    order: order,
                                })
                            }}
                            text={'Закрыть задачу'}
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
