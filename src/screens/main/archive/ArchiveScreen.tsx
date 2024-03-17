import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/useAppDispatch'
import AppBar from '../../../components/ui/app-bar'
import { SafeAreaView, StyleSheet } from 'react-native'
import AppColors from '../../../constants/Colors'
import AppInput from '../../../components/ui/input'
import AppStrings from '../../../constants/Strings'
import { CalendarAddIcon } from '../../../components/icons/CalendarAddIcon'
import { SearchIcon } from '@gluestack-ui/themed'

export default function ArchiveScreen() {
    const [search, onChangeSearch] = useState('')

    const dispatch = useAppDispatch()
    const orderState = useAppSelector((state) => state.order)

    useEffect(() => {
        if (!orderState.isLoading) {
            //dispatch(fetchMyOrders());
        }
    }, [])

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
        paddingHorizontal: 12,
        paddingTop: 30,
        paddingBottom: 16,
    },
})
