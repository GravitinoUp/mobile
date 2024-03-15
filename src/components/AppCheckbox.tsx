import { StyleSheet, Text } from 'react-native'
import AppColors from '../constants/Colors'
import {
    CheckIcon,
    Checkbox,
    CheckboxIcon,
    CheckboxIndicator,
    CheckboxLabel,
} from '@gluestack-ui/themed'

interface Props {
    label: string
    isChecked: boolean
    onChange: (isSelected: boolean) => void
    isDisabled?: boolean
}

const AppCheckbox = ({
    label,
    isChecked = false,
    onChange,
    isDisabled = false,
}: Props) => (
    <Checkbox
        value=""
        size="md"
        isChecked={isChecked}
        onChange={onChange}
        isDisabled={isDisabled}
        aria-label={label}
    >
        <CheckboxIndicator mr={'$2'}>
            <CheckboxIcon as={CheckIcon} />
        </CheckboxIndicator>
        <CheckboxLabel style={styles.label}>{label}</CheckboxLabel>
    </Checkbox>
)

const styles = StyleSheet.create({
    label: {
        fontSize: 14,
        color: AppColors.text,
    },
})

export default AppCheckbox
