import { Text, View } from "react-native";
import { TaskIcon } from "../../../../components/icons/TaskIcon";
import AppStrings from "../../../../constants/Strings";
import AppColors from "../../../../constants/Colors";

const EmptyOrderList = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <TaskIcon />
    <Text style={{ marginTop: 16, fontSize: 14, color: AppColors.bodyLight }}>{AppStrings.emptyOrderList}</Text>
  </View>
);

export default EmptyOrderList;