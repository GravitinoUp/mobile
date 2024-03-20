import { StyleSheet, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import AppStrings from '../../constants/strings'
import { AppColors } from '../../constants/colors'
import { Spinner } from '@gluestack-ui/themed'

export default function SplashScreen({ navigation }: any) {
    return (
        <SafeAreaView style={styles.view}>
            <Text style={styles.title}>{AppStrings.appName}</Text>
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
        color: AppColors.primary,
        textAlign: 'center',
        paddingBottom: 20,
    },
})
