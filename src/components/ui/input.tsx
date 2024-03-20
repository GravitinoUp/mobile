import {
    GestureResponderEvent,
    StyleProp,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native'
import { AppColors } from '../../constants/colors'
import { ComponentProps } from 'react'
import { Input, InputField, InputSlot } from '@gluestack-ui/themed'

type InputFieldProps = ComponentProps<typeof InputField>
type AppInputProps = {
    style?: StyleProp<ViewStyle>
    value: string
    onChangeText: (text: string) => void
    hint?: string | null
    hintStyle?: StyleProp<TextStyle>
    trailingIcon?: React.JSX.Element
    onTrailingIconPress?: () => void
    leadingIcon?: React.JSX.Element
    onTouchEnd?: ((event: GestureResponderEvent) => void) | undefined
} & InputFieldProps

const AppInput = ({
    style,
    value,
    onChangeText,
    hint,
    hintStyle = { fontSize: 14, color: AppColors.hint },
    minHeight,
    leadingIcon,
    trailingIcon,
    onTrailingIconPress,
    onTouchEnd,
    ...props
}: AppInputProps) => {
    return (
        <View style={style}>
            {hint && <Text style={[styles.hintText, hintStyle]}>{hint}</Text>}
            <Input
                variant="rounded"
                h={props.multiline ? undefined : '$11'}
                minHeight={minHeight}
                borderColor={AppColors.border}
                $focus-borderColor={AppColors.borderActive}
                $invalid-borderColor={AppColors.error}
                borderRadius="$2xl"
                borderWidth={1.5}
                onTouchEnd={onTouchEnd}
            >
                {leadingIcon && (
                    <InputSlot style={styles.leading}>{leadingIcon}</InputSlot>
                )}
                <InputField
                    value={value}
                    onChangeText={onChangeText}
                    fontSize={14}
                    color={AppColors.text}
                    px={16}
                    {...props}
                />
                {trailingIcon && (
                    <TouchableOpacity
                        style={styles.trailing}
                        onPress={onTrailingIconPress}
                    >
                        {trailingIcon}
                    </TouchableOpacity>
                )}
            </Input>
        </View>
    )
}

const styles = StyleSheet.create({
    leading: {
        paddingLeft: 16,
    },
    trailing: {
        padding: 16,
    },
    hintText: {
        fontSize: 14,
        color: AppColors.bodyLight,
        paddingBottom: 6,
    },
})

export default AppInput
