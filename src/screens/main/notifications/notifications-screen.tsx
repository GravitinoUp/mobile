import { useState } from 'react'
import AppBar from '../../../components/ui/app-bar'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { AppColors } from '../../../constants/colors'
import AppInput from '../../../components/ui/input'
import AppStrings from '../../../constants/strings'
import { CalendarAddIcon } from '../../../components/icons/CalendarAddIcon'
import { SearchIcon } from '@gluestack-ui/themed'
import AltButton from '../../../components/alt-button/alt-button'

export default function NotificationsScreen() {
    const [search, onChangeSearch] = useState('')
    const [selectedType, setSelectedType] = useState(0)

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
                <View style={{ marginTop: 14, flexDirection: 'row', gap: 12 }}>
                    <AltButton
                        text={AppStrings.unread}
                        onPress={() => setSelectedType(0)}
                        selected={selectedType === 0}
                    />
                    <AltButton
                        text={AppStrings.read}
                        onPress={() => setSelectedType(1)}
                        selected={selectedType === 1}
                    />
                    {/* <AppButton
                        style={{ flex: 1 }}
                        onPress={() => setSelectedType(0)}
                        text={AppStrings.unread}
                        textProps={{
                            color:
                                selectedType === 0
                                    ? AppColors.textOnPrimary
                                    : AppColors.text,
                        }}
                        borderRadius={30}
                        borderColor={AppColors.text}
                        backgroundColor={
                            selectedType === 0
                                ? AppColors.text
                                : AppColors.background
                        }
                        py={5}
                    />
                    <AppButton
                        style={{ flex: 1 }}
                        onPress={() => setSelectedType(1)}
                        text={AppStrings.read}
                        textProps={{
                            color:
                                selectedType === 1
                                    ? AppColors.textOnPrimary
                                    : AppColors.text,
                        }}
                        borderRadius={30}
                        borderColor={AppColors.text}
                        backgroundColor={
                            selectedType === 1
                                ? AppColors.text
                                : AppColors.background
                        }
                        py={5}
                    /> */}
                </View>
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
