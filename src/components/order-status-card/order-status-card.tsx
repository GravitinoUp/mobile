import renderIconSwitch from './render-icon-switch'
import { AppColors } from '../../constants/colors'
import { HStack, Text } from '@gluestack-ui/themed'
import { getStatusColor } from './get-status-color'

type OrderStatusCardProps = {
    orderStatus: string
}

const OrderStatusCard = ({ orderStatus }: OrderStatusCardProps) => (
    <HStack
        pl="$3"
        pr="$2"
        py={6}
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
