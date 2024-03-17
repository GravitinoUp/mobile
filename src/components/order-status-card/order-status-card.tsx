import renderIconSwitch from './render-icon-switch'
import { AppColors } from '../../constants/colors'
import { HStack, Text } from '@gluestack-ui/themed'
import { getStatusColor } from './get-status-color'

type OrderStatusCardProps = {
    orderStatus: string
}

const OrderStatusCard = ({ orderStatus }: OrderStatusCardProps) => (
    <HStack
        p="$2"
        borderRadius="$xl"
        backgroundColor={getStatusColor(orderStatus)}
    >
        <Text fontSize={14} color={AppColors.background} mr="$1">
            {orderStatus}
        </Text>
        {renderIconSwitch(orderStatus)}
    </HStack>
)

export default OrderStatusCard
