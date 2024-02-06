import { Checkbox } from "native-base"
import { StyleSheet, Text } from "react-native"
import AppColors from "../constants/Colors";

interface Props {
  label: string,
  isChecked: boolean,
  onChange: (isSelected: boolean) => void,
  isDisabled?: boolean,
}

const AppCheckbox = ({ label, isChecked = false, onChange, isDisabled = false, }: Props) => (
  <Checkbox value="" isChecked={isChecked} onChange={onChange} isDisabled={isDisabled}>
    <Text style={styles.label}>
      {label}
    </Text>
  </Checkbox>
);

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    color: AppColors.text
  }
});

export default AppCheckbox;