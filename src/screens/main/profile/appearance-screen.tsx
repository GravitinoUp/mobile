import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'
import { AppColors, COLOR_SCHEMES } from '../../../constants/colors'
import AppBar, { AppBarTitle } from '../../../components/ui/app-bar'
import BackButton from '../../../components/back-button/back-button'
import { HStack, Text, View } from '@gluestack-ui/themed'
import AppStrings from '../../../constants/strings'
import Divider from '../../../components/ui/divider'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState } from 'react'

export default function AppearanceScreen({ navigation }: any) {
    const [appearanceColor, setAppearanceColor] = useState(AppColors.primary)

    const handleChangeAppearance = async (selectedColor: string) => {
        AppColors.primary = selectedColor
        await AsyncStorage.setItem('appearance', selectedColor)
        setAppearanceColor(selectedColor)

        navigation.goBack()
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: AppColors.background,
            }}
        >
            <AppBar>
                <HStack justifyContent="space-between" alignItems="center">
                    <BackButton navigation={navigation} />
                    <AppBarTitle>{AppStrings.appearance}</AppBarTitle>
                    <View />
                </HStack>
            </AppBar>
            <Divider borderStyle="solid" />
            <ScrollView contentContainerStyle={styles.scrollView}>
                <Text>{AppStrings.colorScheme}</Text>
                <HStack my="$8" gap="$4">
                    {Object.entries(COLOR_SCHEMES).map((value) => (
                        <TouchableOpacity
                            key={value[0]}
                            activeOpacity={0.8}
                            onPress={async () =>
                                await handleChangeAppearance(value[1])
                            }
                        >
                            <View
                                w="$6"
                                h="$6"
                                bgColor={value[1]}
                                borderRadius="$full"
                                justifyContent="center"
                                alignItems="center"
                            >
                                {appearanceColor === value[1] && (
                                    <View
                                        w="$2"
                                        h="$2"
                                        bgColor={AppColors.background}
                                        borderRadius="$full"
                                    />
                                )}
                            </View>
                        </TouchableOpacity>
                    ))}
                </HStack>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: AppColors.background,
    },
})
