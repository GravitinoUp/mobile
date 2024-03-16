import { StyleProp, ViewStyle } from 'react-native'
import AppColors from '../../constants/Colors'
import { Button, ButtonSpinner, ButtonText } from '@gluestack-ui/themed'

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
        h="$11"
        style={style}
        onPress={onPress}
        backgroundColor={backgroundColor}
        borderColor={borderColor}
        borderRadius={'$2xl'}
        px={paddingX}
        isDisabled={isDisabled || isLoading}
        $disabled-opacity="$75"
    >
        {!isLoading && (
            <ButtonText
                fontSize={fontSize}
                fontWeight={fontWeight}
                color={foregroundColor}
                textAlign={'center'}
            >
                {text}
            </ButtonText>
        )}
        {isLoading && <ButtonSpinner ml="$2" />}
    </Button>
)

export default AppButton
