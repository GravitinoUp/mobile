import { Spinner } from "native-base";
import { View } from "react-native";
import AppColors from "../constants/Colors";

const LoadingView = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Spinner size={"120px"} color={AppColors.primary} />
  </View>
);

export default LoadingView;