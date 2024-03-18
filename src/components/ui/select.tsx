import { StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native'
import { AppColors } from '../../constants/colors'
import { ComponentProps, useState } from 'react'
import {
    Select,
    SelectPortal,
    SelectBackdrop,
    SelectContent,
    SelectDragIndicatorWrapper,
    SelectDragIndicator,
    SelectItem,
    ChevronDownIcon,
    Icon,
    SelectIcon,
    SelectInput,
    SelectTrigger,
    SelectScrollView,
    Text,
} from '@gluestack-ui/themed'
import { defaultSelectItem } from '../../constants/constants'
import AppStrings from '../../constants/strings'

export interface SelectItemInterface {
    label: string
    value: string
    isDisabled?: boolean
}

type SelectProps = ComponentProps<typeof Select>
type SelectItemProps = ComponentProps<typeof SelectItem>
type Props = {
    style?: StyleProp<ViewStyle>
    hint?: string
    hintStyle?: StyleProp<TextStyle>
    items: SelectItemInterface[]
    value: any
    setValue: (value: any) => void
    includeDefault?: boolean
    //labelStyle?: StyleProp<TextStyle>
} & SelectProps

const AppSelect = ({
    style,
    items,
    value,
    setValue,
    hint,
    hintStyle,
    placeholder = AppStrings.selectValue,
    h = '$11',
    includeDefault = true,
    ...props
}: Props) => {
    return (
        <View style={style}>
            {hint && <Text style={[styles.hintText, hintStyle]}>{hint}</Text>}
            <Select
                h={h}
                {...props}
                initialLabel={
                    includeDefault ? defaultSelectItem.label : undefined
                }
                defaultValue={
                    includeDefault ? defaultSelectItem.value : undefined
                }
            >
                <SelectTrigger h={h} variant="rounded" borderRadius="$2xl">
                    <SelectInput placeholder={placeholder} />
                    <Icon mr="$4" as={ChevronDownIcon} />
                </SelectTrigger>
                <SelectPortal>
                    <SelectBackdrop />
                    <SelectContent px={0} maxHeight="$full">
                        <SelectDragIndicatorWrapper>
                            <SelectDragIndicator />
                        </SelectDragIndicatorWrapper>
                        <Text
                            my="$1"
                            color={AppColors.text}
                            fontSize="$lg"
                            fontWeight="$semibold"
                        >
                            {placeholder}
                        </Text>
                        <SelectScrollView persistentScrollbar>
                            {includeDefault && (
                                <SelectItem
                                    borderRadius="$none"
                                    p="$4"
                                    {...defaultSelectItem}
                                />
                            )}
                            {items.map((item, index) => (
                                <SelectItem
                                    key={`select-item-${index}`}
                                    borderRadius="$none"
                                    p="$4"
                                    {...item}
                                />
                            ))}
                        </SelectScrollView>
                    </SelectContent>
                </SelectPortal>
            </Select>
        </View>
    )
}

const styles = StyleSheet.create({
    hintText: {
        fontSize: 14,
        color: AppColors.bodyLight,
        paddingBottom: 6,
    },
    dropdown: {
        paddingHorizontal: 8,
        paddingVertical: 8,
        borderRadius: 16,
        borderWidth: 1.5,
        borderColor: AppColors.border,
        zIndex: 1,
    },
    dropDownContainerStyle: {
        borderRadius: 16,
        backgroundColor: AppColors.background,
        borderWidth: 1.5,
        borderColor: AppColors.border,
    },
    labelStyle: {
        flex: 0,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 8,
        backgroundColor: AppColors.card,
        borderWidth: 1.5,
        borderColor: AppColors.border,
        fontSize: 16,
        color: AppColors.text,
    },
    listItemContainerStyle: {
        zIndex: 99,
    },
    listItemLabelStyle: {
        fontSize: 16,
        color: AppColors.text,
    },
})

export default AppSelect
