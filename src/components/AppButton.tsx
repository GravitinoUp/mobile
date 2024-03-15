import { StyleProp, ViewStyle } from 'react-native'
import AppColors from '../constants/Colors'
import { Button, ButtonSpinner, ButtonText, Text } from '@gluestack-ui/themed'

type AppButtonProps = {
    onPress: () => void
    style?: StyleProp<ViewStyle>
    text: string
    borderRadius?: number
    borderColor?: string
    backgroundColor?: string
    foregroundColor?: string
    fontSize?: number
    fontWeight?: string
    width?: number
    paddingX?: number
    paddingY?: number
    isDisabled?: boolean
    isLoading?: boolean
}

const AppButton = ({
    style,
    onPress,
    text,
    backgroundColor = AppColors.primary,
    foregroundColor = AppColors.textOnPrimary,
    fontSize = 15,
    fontWeight = 'bold',
    borderColor = '#00000000',
    borderRadius = 16,
    width,
    paddingX = 16,
    paddingY = 10,
    isDisabled = false,
    isLoading = false,
}: AppButtonProps) => (
    <Button
        w={width}
        style={style}
        onPress={onPress}
        backgroundColor={backgroundColor}
        borderColor={borderColor}
        borderWidth={'$1'}
        borderRadius={'$xl'}
        px={paddingX}
        isDisabled={isDisabled}
    >
        {isLoading && <ButtonSpinner />}
        <ButtonText
            fontSize={fontSize}
            fontWeight={fontWeight}
            color={foregroundColor}
            textAlign={'center'}
        >
            {text}
        </ButtonText>
    </Button>
)

export default AppButton
