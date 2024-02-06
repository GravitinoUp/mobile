import { useState } from "react";
import AppTopBar from "../../../components/AppTopBar";
import { SafeAreaView, StyleSheet, View } from "react-native";
import AppColors from "../../../constants/Colors";
import AppTextInput from "../../../components/AppTextInput";
import { SearchIcon } from "native-base";
import AppStrings from "../../../constants/Strings";
import { CalendarAddIcon } from "../../../components/icons/CalendarAddIcon";
import AppButton from "../../../components/AppButton";

export default function NotificationsScreen() {
  const [search, onChangeSearch] = useState('');
  const [selectedType, setSelectedType] = useState(0);

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
        <View style={{ marginTop: 14, flexDirection: 'row', gap: 12 }}>
          <AppButton
            style={{ flex: 1 }}
            onPress={() => setSelectedType(0)}
            text={AppStrings.unread}
            borderRadius={30}
            borderColor={AppColors.text}
            backgroundColor={selectedType === 0 ? AppColors.text : AppColors.background}
            foregroundColor={selectedType === 0 ? AppColors.textOnPrimary : AppColors.text}
            paddingY={5}
          />
          <AppButton
            style={{ flex: 1 }}
            onPress={() => setSelectedType(1)}
            text={AppStrings.read}
            borderRadius={30}
            borderColor={AppColors.text}
            backgroundColor={selectedType === 1 ? AppColors.text : AppColors.background}
            foregroundColor={selectedType === 1 ? AppColors.textOnPrimary : AppColors.text}
            paddingY={5}
          />
        </View>
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