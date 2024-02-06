import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { IOrder } from "../../../../types/interface/order";
import { CalendarIcon } from "../../../../components/icons/CalendarIcon";
import AppColors from "../../../../constants/Colors";
import moment from "moment";
import AppStrings from "../../../../constants/Strings";
import renderIconSwitch from "../../../../utils/renderIconSwitch";


type OrderCardProps = {
  style?: StyleProp<ViewStyle>,
  orderData?: IOrder,
  icon?: React.JSX.Element,
  onPress: () => void
};

const OrderCard = ({ style, orderData, icon, onPress }: OrderCardProps) => {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={onPress} style={[style, styles.card]}>
      <View style={styles.topRow}>
        <View style={{ flex: 1, flexDirection: 'row', }}>
          <CalendarIcon />
          <Text style={{ marginLeft: 6 }}>{moment(orderData?.planned_datetime).format(AppStrings.longDateFormat)}</Text>
        </View>
        {renderIconSwitch(orderData?.order_status?.order_status_name)}
      </View>
      <View style={{ height: 1, width: '100%', borderRadius: 1, borderWidth: 1, borderColor: AppColors.border, borderStyle: 'dashed' }} />
      <Text ellipsizeMode="tail" numberOfLines={1} style={styles.content}>{orderData?.task?.task_description}</Text>
    </TouchableOpacity >
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    backgroundColor: AppColors.background,
    elevation: 10,
    shadowColor: AppColors.text,
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginHorizontal: 16,
    marginBottom: 26,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16
  },
  content: {
    padding: 20,
    fontSize: 16,
    color: AppColors.text,
  }
});

export default OrderCard;