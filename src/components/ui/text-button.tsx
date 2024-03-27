import { ComponentProps } from 'react'
import { Text } from '@gluestack-ui/themed'
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native'
import { AppColors } from '../../constants/colors'

type TextProps = ComponentProps<typeof Text>
type Props = {
    style?: StyleProp<ViewStyle>
    text: string
    onPress: () => void
} & TextProps

const TextButton = ({
    style,
    text,
    onPress,
    color = AppColors.primary,
    fontSize = 15,
    fontWeight = 'normal',
    ...props
}: Props) => (
    <TouchableOpacity style={style} activeOpacity={0.5} onPress={onPress}>
        <Text
            fontSize={fontSize}
            fontWeight={fontWeight}
            color={color}
            {...props}
        >
            {text}
        </Text>
    </TouchableOpacity>
)

export default TextButton
