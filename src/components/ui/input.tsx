import {
    DimensionValue,
    StyleProp,
    StyleSheet,
    Text,
    TextStyle,
    View,
    ViewStyle,
} from 'react-native'
import AppColors from '../../constants/Colors'
import { useState } from 'react'
import { Input, InputField, InputSlot } from '@gluestack-ui/themed'

type AppInputProps = {
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

const AppInput = ({
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
}: AppInputProps) => {
    return (
        <View style={style}>
            {hint && <Text style={[styles.hintText, hintStyle]}>{hint}</Text>}
            <Input
                variant="rounded"
                borderRadius="$2xl"
                minHeight={minHeight}
                h="$11"
            >
                {leadingIcon && (
                    <InputSlot
                        style={styles.leading}
                        onPress={onLeadingIconPress}
                    >
                        {leadingIcon}
                    </InputSlot>
                )}
                <InputField
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    fontSize={14}
                    readOnly={readOnly}
                    multiline={multiline}
                    secureTextEntry={secureTextEntry}
                    textAlignVertical={textAlignVertical}
                    color={AppColors.text}
                    paddingHorizontal={16}
                />
                {trailingIcon && (
                    <InputSlot
                        style={styles.trailing}
                        onPress={onTrailingIconPress}
                    >
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

export default AppInput
