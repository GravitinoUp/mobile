import { ComponentProps } from 'react'
import { Button, ButtonSpinner, ButtonText } from '@gluestack-ui/themed'
import { StyleProp, ViewStyle } from 'react-native'
import { AppColors } from '../../constants/colors'

type ButtonProps = ComponentProps<typeof Button>
type ButtonTextProps = ComponentProps<typeof ButtonText>
type AppButtonProps = {
    onPress: () => void
    style?: StyleProp<ViewStyle>
    text: string
    textProps?: ButtonTextProps
    isLoading?: boolean
} & ButtonProps

const AppButton = ({
    style,
    text,
    textProps: textStyle = {
        fontSize: 15,
        fontWeight: '$bold',
        color: AppColors.textOnPrimary,
    },
    backgroundColor = AppColors.primary,
    borderColor = '#00000000',
    isLoading = false,
    ...props
}: AppButtonProps) => (
    <Button
        key={props.key}
        style={style}
        h="$12"
        backgroundColor={backgroundColor}
        borderColor={borderColor}
        borderRadius={'$2xl'}
        $disabled-opacity="$75"
        {...props}
        isDisabled={props.isDisabled || isLoading}
    >
        {!isLoading && (
            <ButtonText textAlign={'center'} {...textStyle}>
                {text}
            </ButtonText>
        )}
        {isLoading && <ButtonSpinner ml="$2" />}
    </Button>
)

export default AppButton
