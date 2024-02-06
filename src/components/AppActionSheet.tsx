import { Actionsheet, Box } from "native-base";
import { StyleProp, ViewStyle } from "react-native";
import AppColors from "../constants/Colors";

type Props = {
  style?: StyleProp<ViewStyle>,
  children?: React.ReactNode,
  isOpen: boolean,
  onClose: () => void
};

const AppActionSheet = ({ style, children, isOpen, onClose }: Props) => {
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content backgroundColor={AppColors.background}>
        <Box style={style} w="100%" justifyContent={"center"}>
          {children}
        </Box>
      </Actionsheet.Content>
    </Actionsheet>
  );
}

export default AppActionSheet;