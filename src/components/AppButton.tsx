import { StyleProp, ViewStyle } from "react-native";
import AppColors from "../constants/Colors";
import { Button, Text } from "native-base";

type AppButtonProps = {
  onPress: () => void,
  style?: StyleProp<ViewStyle>,
  text: string,
  borderRadius?: number,
  borderColor?: string,
  backgroundColor?: string,
  foregroundColor?: string,
  fontSize?: string,
  fontWeight?: string,
  width?: string,
  paddingX?: number,
  paddingY?: number,
  isDisabled?: boolean,
  isLoading?: boolean
};

const AppButton = ({
  style,
  onPress,
  text,
  backgroundColor = AppColors.primary,
  foregroundColor = AppColors.textOnPrimary,
  fontSize = "15px",
  fontWeight = "bold",
  borderColor = "#00000000",
  borderRadius = 16,
  width,
  paddingX = 16,
  paddingY = 10,
  isDisabled = false,
  isLoading = false,
}: AppButtonProps) => (
  <Button
    width={width}
    style={style}
    onPress={onPress}
    backgroundColor={backgroundColor}
    borderColor={borderColor}
    borderWidth={"1.5px"}
    borderRadius={`${borderRadius}px`}
    padding={`${paddingY}px ${paddingX}px`}
    isDisabled={isDisabled}
    _disabled={{ backgroundColor: AppColors.disabled, opacity: 1 }}
    isLoading={isLoading}
    _loading={{ opacity: 1 }}
  >
    <Text
      fontSize={fontSize}
      fontWeight={fontWeight}
      color={foregroundColor}
      textAlign={"center"}
    >
      {text}
    </Text>
  </Button>
);

export default AppButton;