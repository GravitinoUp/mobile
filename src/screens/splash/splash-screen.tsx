import { Spinner, Text } from '@gluestack-ui/themed'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AppColors } from '../../constants/colors'
import AppStrings from '../../constants/strings'

export default function SplashScreen() {
    return (
        <SafeAreaView style={styles.view}>
            <Text style={styles.title} color={AppColors.primary}>
                {AppStrings.appName}
            </Text>
            <Spinner size="large" color={AppColors.primary} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    view: {
        flexGrow: 1,
        justifyContent: 'center',
        backgroundColor: AppColors.background,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        textAlign: 'center',
        paddingBottom: 20,
    },
})
