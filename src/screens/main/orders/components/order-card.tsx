import {
    StyleProp,
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
    ViewStyle,
} from 'react-native'
import CalendarIcon from '../../../../components/icons/calendar'
import { AppColors } from '../../../../constants/colors'
import renderIconSwitch from '../../../../components/order-status-card/render-icon-switch'
import { OrderInterface } from '../../../../types/interface/orders'
import { formatDate } from '../../../../utils/helpers'

type OrderCardProps = {
    style?: StyleProp<ViewStyle>
    orderData?: OrderInterface
    onPress: () => void
}

const OrderCard = ({ style, orderData, onPress }: OrderCardProps) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            style={[style, styles.card]}
        >
            <View style={styles.topRow}>
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                        }}
                    >
                        <CalendarIcon />
                        <Text style={styles.titleContainer}>
                            <Text style={styles.title}>
                                {orderData?.order_name}
                            </Text>
                            <Text style={styles.titleHint}>
                                {` (${formatDate(
                                    orderData?.planned_datetime
                                )})`}
                            </Text>
                        </Text>
                    </View>
                    <View style={{ width: 40, height: 20 }}>
                        {renderIconSwitch(
                            orderData?.order_status?.order_status_name
                        )}
                    </View>
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
            <Text ellipsizeMode="tail" numberOfLines={2} style={styles.content}>
                {orderData?.order_description}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 16,
        backgroundColor: AppColors.background,
        elevation: 5,
        shadowColor: AppColors.text,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        marginHorizontal: 16,
        marginBottom: 26,
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 16,
    },
    content: {
        padding: 16,
        fontSize: 16,
        color: AppColors.text,
    },
    titleContainer: {
        marginLeft: 8,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: AppColors.text,
    },
    titleHint: {
        fontSize: 14,
        color: AppColors.hint,
    },
})

export default OrderCard
