import { useState } from 'react'
import AppBar from '../../../components/ui/app-bar'
import { SafeAreaView, StyleSheet } from 'react-native'
import { AppColors } from '../../../constants/colors'
import AppInput from '../../../components/ui/input'
import AppStrings from '../../../constants/strings'
import { CalendarAddIcon } from '../../../components/icons/CalendarAddIcon'
import { SearchIcon } from '@gluestack-ui/themed'

export default function ReportsScreen() {
    const [search, onChangeSearch] = useState('')

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: AppColors.background }}
        >
            <AppBar style={styles.header}>
                <AppInput
                    value={search}
                    onChangeText={(text: string) => {
                        onChangeSearch(text)
                    }}
                    placeholder={AppStrings.search}
                    leadingIcon={<SearchIcon />}
                    trailingIcon={<CalendarAddIcon />}
                    onTrailingIconPress={() => {}}
                />
            </AppBar>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        elevation: 20,
        shadowColor: AppColors.text,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
})
