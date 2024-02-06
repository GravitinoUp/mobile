import { StyleProp, TouchableOpacity, ViewStyle } from "react-native";
import AppColors from "../constants/Colors";
import { Button, Text, View } from "native-base";

type Props = {
  onPress: () => void,
  style?: StyleProp<ViewStyle>,
  text: string,
  foregroundColor?: string,
  fontSize?: string,
  fontWeight?: string,
};

const AppTextButton = ({
  style,
  onPress,
  text,
  foregroundColor = AppColors.primary,
  fontSize = "15px",
  fontWeight = "normal",
}: Props) => (
  <TouchableOpacity
    style={style}
    activeOpacity={0.5}
    onPress={onPress}
  >
    <Text
      fontSize={fontSize}
      fontWeight={fontWeight}
      color={foregroundColor}
    >
      {text}
    </Text>
  </TouchableOpacity>
);

export default AppTextButton;