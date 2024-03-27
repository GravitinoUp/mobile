import { ComponentProps } from 'react'
import { Text } from '@gluestack-ui/themed'
import { Linking, TouchableOpacity } from 'react-native'
import { AppColors } from '../../constants/colors'
import { GRAVITINO_URL } from '../../constants/constants'
import AppStrings from '../../constants/strings'

type TextProps = ComponentProps<typeof Text>
const Watermark = ({ ...props }: TextProps) => (
    <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => Linking.openURL(GRAVITINO_URL)}
    >
        <Text textAlign="center" {...props}>
            <Text color={AppColors.borderActive}>{AppStrings.madeIn}</Text>
            <Text color={AppColors.borderActive} fontWeight="$semibold">
                {AppStrings.gravitino}
            </Text>
        </Text>
    </TouchableOpacity>
)

export default Watermark
