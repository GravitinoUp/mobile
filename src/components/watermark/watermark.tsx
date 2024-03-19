import { Text } from '@gluestack-ui/themed'
import AppStrings from '../../constants/strings'
import { AppColors } from '../../constants/colors'
import { ComponentProps } from 'react'

type TextProps = ComponentProps<typeof Text>
const Watermark = ({ ...props }: TextProps) => (
    <Text textAlign="center" {...props}>
        <Text color={AppColors.borderActive}>{AppStrings.madeIn}</Text>
        <Text color={AppColors.borderActive} fontWeight="$semibold">
            {AppStrings.gravitino}
        </Text>
    </Text>
)

export default Watermark
