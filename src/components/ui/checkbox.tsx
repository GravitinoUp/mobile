import { ComponentProps } from 'react'
import {
    CheckIcon,
    Checkbox,
    CheckboxIcon,
    CheckboxIndicator,
    CheckboxLabel,
} from '@gluestack-ui/themed'
import { StyleSheet } from 'react-native'
import { AppColors } from '../../constants/colors'

type CheckboxProps = ComponentProps<typeof Checkbox>
type Props = {
    label: string
} & CheckboxProps

const AppCheckbox = ({ label, ...props }: Props) => (
    <Checkbox size="md" aria-label={label} {...props}>
        <CheckboxIndicator
            borderColor={AppColors.primary}
            $active-bgColor={
                props.isChecked ? AppColors.primary : AppColors.transparent
            }
            $base-bgColor={AppColors.transparent}
            $checked-bgColor={AppColors.primary}
            mr={'$2'}
        >
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
