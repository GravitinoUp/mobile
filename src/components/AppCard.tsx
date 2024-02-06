import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import AppColors from "../constants/Colors";

type Props = {
  style?: StyleProp<ViewStyle>,
  children?: React.ReactNode,
};

const AppCard = ({ style, children }: Props) => (
  <View style={[style, styles.card]}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    elevation: 20,
    shadowColor: AppColors.shadowColor,
    backgroundColor: AppColors.background,
  }
});

export default AppCard;