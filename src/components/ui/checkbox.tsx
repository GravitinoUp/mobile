import { StyleSheet, Text } from 'react-native'
import AppColors from '../../constants/Colors'
import {
    CheckIcon,
    Checkbox,
    CheckboxIcon,
    CheckboxIndicator,
    CheckboxLabel,
} from '@gluestack-ui/themed'
import { ComponentProps } from 'react'

type CheckboxProps = ComponentProps<typeof Checkbox>
type Props = {
    label: string
} & CheckboxProps

const AppCheckbox = ({ label, ...props }: Props) => (
    <Checkbox size="md" aria-label={label} {...props}>
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
