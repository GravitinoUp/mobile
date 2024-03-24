import {
    StyleProp,
    StyleSheet,
    TouchableOpacity,
    ViewStyle,
} from 'react-native'
import CalendarIcon from '../../../../components/icons/calendar'
import { AppColors } from '../../../../constants/colors'
import renderIconSwitch from '../../../../components/order-status-card/render-icon-switch'
import { OrderInterface } from '../../../../types/interface/orders'
import { formatDate } from '../../../../utils/helpers'
import { HStack, Text } from '@gluestack-ui/themed'
import Divider from '../../../../components/ui/divider'

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
            <HStack
                p="$4"
                pr="$8"
                justifyContent="space-between"
                alignItems="center"
            >
                <HStack alignItems="center">
                    <CalendarIcon />
                    <Text style={{ flex: 1 }} ml="$2">
                        <Text
                            fontSize="$md"
                            fontWeight="$semibold"
                            color={AppColors.text}
                        >
                            {orderData?.order_name}
                        </Text>
                        {orderData?.planned_datetime && (
                            <Text fontSize="$sm" color={AppColors.hint}>
                                {` (${formatDate(
                                    orderData?.planned_datetime
                                )})`}
                            </Text>
                        )}
                    </Text>
                </HStack>
                {renderIconSwitch(orderData?.order_status?.order_status_name)}
            </HStack>
            <Divider />
            <Text
                p="$4"
                ellipsizeMode="tail"
                numberOfLines={2}
                fontSize={14}
                lineHeight="$xs"
                color={AppColors.text}
            >
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
        marginBottom: 20,
    },
})

export default OrderCard
