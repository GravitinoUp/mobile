import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/useAppDispatch";
import AppTopBar from "../../../components/AppTopBar";
import { SafeAreaView, StyleSheet } from "react-native";
import AppColors from "../../../constants/Colors";
import AppTextInput from "../../../components/AppTextInput";
import { SearchIcon } from "native-base";
import AppStrings from "../../../constants/Strings";
import { CalendarAddIcon } from "../../../components/icons/CalendarAddIcon";

export default function ArchiveScreen() {
  const [search, onChangeSearch] = useState('');

  const dispatch = useAppDispatch();
  const orderState = useAppSelector(state => state.order);

  useEffect(() => {
    if (!orderState.isLoading) {
      //dispatch(fetchMyOrders());
    }
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: AppColors.background }}>
      <AppTopBar style={styles.header}>
        <AppTextInput
          value={search}
          onChangeText={(text: string) => {
            onChangeSearch(text)
          }}
          placeholder={AppStrings.search}
          leadingIcon={<SearchIcon />}
          trailingIcon={<CalendarAddIcon />}
          onTrailingIconPress={() => { }}
        />
      </AppTopBar>
    </SafeAreaView>);
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 12,
    paddingTop: 30,
    paddingBottom: 16,
  }
});