import {
    StyleProp,
    StyleSheet,
    Text,
    TextStyle,
    View,
    ViewStyle,
} from 'react-native'
import AppColors from '../../constants/Colors'
import DropDownPicker, { ItemType } from 'react-native-dropdown-picker'
import { useState } from 'react'

interface Props {
    style?: StyleProp<ViewStyle>
    hint?: string
    hintStyle?: StyleProp<TextStyle>
    items: ItemType<any>[]
    value: any
    setValue: (value: any) => void
    searchable?: boolean
    labelStyle?: StyleProp<TextStyle>
}

const Select = ({
    style,
    hint,
    hintStyle,
    items,
    value,
    setValue,
    searchable = false,
    labelStyle = styles.labelStyle,
}: Props) => {
    const [open, setOpen] = useState(false)

    return (
        <View style={style}>
            {hint && <Text style={[styles.hintText, hintStyle]}>{hint}</Text>}
            <DropDownPicker
                style={styles.dropdown}
                props={{ activeOpacity: 0.5 }}
                itemProps={{ activeOpacity: 0.5 }}
                dropDownContainerStyle={styles.dropDownContainerStyle}
                labelStyle={labelStyle}
                listItemContainerStyle={styles.listItemContainerStyle}
                listItemLabelStyle={styles.listItemLabelStyle}
                showTickIcon={false}
                searchable={searchable}
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
            />
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

export default Select
