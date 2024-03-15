import {
    DimensionValue,
    StyleProp,
    StyleSheet,
    Text,
    TextStyle,
    View,
    ViewStyle,
} from 'react-native'
import AppColors from '../constants/Colors'
import { useState } from 'react'
import { Input, InputField, InputSlot } from '@gluestack-ui/themed'

type AppTextInputProps = {
    style?: StyleProp<ViewStyle>
    value: string
    onChangeText: (text: string) => void
    hint?: string | null
    hintStyle?: StyleProp<TextStyle>
    placeholder?: string
    minHeight?: DimensionValue
    textAlignVertical?: 'center' | 'auto' | 'top' | 'bottom' | undefined
    secureTextEntry?: boolean
    readOnly?: boolean
    multiline?: boolean
    trailingIcon?: React.JSX.Element
    onTrailingIconPress?: () => void
    leadingIcon?: React.JSX.Element
    onLeadingIconPress?: () => void
}

const AppTextInput = ({
    style,
    value = '',
    onChangeText,
    hint = null,
    hintStyle = { fontSize: 14, color: AppColors.hint },
    placeholder = '',
    minHeight,
    textAlignVertical = 'center',
    secureTextEntry = false,
    readOnly = false,
    multiline = false,
    leadingIcon,
    onLeadingIconPress,
    trailingIcon,
    onTrailingIconPress,
}: AppTextInputProps) => {
    const [isFocused, setFocused] = useState(false)

    return (
        <View style={style}>
            {hint && <Text style={[styles.hintText, hintStyle]}>{hint}</Text>}
            <Input
                borderColor={
                    isFocused ? AppColors.borderActive : AppColors.border
                }
                borderRadius="$2xl"
                borderWidth="$1"
                h={multiline ? undefined : 50}
                minHeight={minHeight}
            >
                {leadingIcon && (
                    <InputSlot style={styles.leading}>{leadingIcon}</InputSlot>
                )}
                <InputField
                    value={value}
                    onChangeText={onChangeText}
                    fontSize={16}
                    placeholder={placeholder}
                    readOnly={readOnly}
                    multiline={multiline}
                    secureTextEntry={secureTextEntry}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    textAlignVertical={textAlignVertical}
                    color={AppColors.text}
                    paddingHorizontal={16}
                />
                {trailingIcon && (
                    <InputSlot style={styles.trailing}>
                        {trailingIcon}
                    </InputSlot>
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

export default AppTextInput
