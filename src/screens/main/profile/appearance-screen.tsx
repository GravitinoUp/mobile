import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import { AppColors } from '../../../constants/colors'
import AppBar from '../../../components/ui/app-bar'
import BackButton from '../../../components/back-button/back-button'
import { HStack, Text, View } from '@gluestack-ui/themed'
import AppStrings from '../../../constants/strings'
import Divider from '../../../components/ui/divider'

export default function AppearanceScreen({ navigation }: any) {
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
                    <Text>{AppStrings.appearance}</Text>
                    <View />
                </HStack>
            </AppBar>
            <Divider />
            <ScrollView contentContainerStyle={styles.scrollView}></ScrollView>
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
