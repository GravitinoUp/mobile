import { StyleProp, StyleSheet, Text, TextInput, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native";
import AppColors from "../constants/Colors";
import { useState } from "react";
import { Input, InputGroup } from "native-base";

type AppTextInputProps = {
  style?: StyleProp<ViewStyle>,
  value: string,
  onChangeText: (text: string) => void,
  hint?: string | null,
  hintStyle?: StyleProp<TextStyle>,
  placeholder?: string,
  minHeight?: string,
  textAlignVertical?: "center" | "auto" | "top" | "bottom" | undefined,
  secureTextEntry?: boolean,
  readOnly?: boolean,
  multiline?: boolean,
  trailingIcon?: React.JSX.Element,
  onTrailingIconPress?: () => void,
  leadingIcon?: React.JSX.Element,
  onLeadingIconPress?: () => void,
};

const AppTextInput = ({
  style,
  value = "",
  onChangeText,
  hint = null,
  hintStyle = { fontSize: 14, color: AppColors.hint },
  placeholder = '',
  minHeight,
  textAlignVertical = "center",
  secureTextEntry = false,
  readOnly = false,
  multiline = false,
  leadingIcon,
  onLeadingIconPress,
  trailingIcon,
  onTrailingIconPress,
}: AppTextInputProps) => {
  const [isFocused, setFocused] = useState(false);

  return (
    <View style={style}>
      {hint && (<Text style={[styles.hintText, hintStyle]}>{hint}</Text>)}
      <Input
        value={value}
        borderColor={isFocused ? AppColors.borderActive : AppColors.border}
        borderRadius={16}
        borderWidth={1.5}
        fontSize={16}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        readOnly={readOnly}
        multiline={multiline}
        color={AppColors.text}
        minHeight={minHeight}
        height={multiline ? null : "50px"}
        textAlignVertical={textAlignVertical}
        InputLeftElement={
          leadingIcon && (<View style={styles.leading}>
            {leadingIcon}
          </View>)
        }
        InputRightElement={
          trailingIcon && (<TouchableOpacity style={styles.trailing} onPress={onTrailingIconPress}>
            {trailingIcon}
          </TouchableOpacity>)
        }
      />
    </View >
  );
}

const styles = StyleSheet.create({
  leading: {
    paddingLeft: 16
  },
  trailing: {
    padding: 16
  },
  hintText: {
    fontSize: 14,
    color: AppColors.bodyLight,
    paddingBottom: 6,
  }
});

export default AppTextInput;