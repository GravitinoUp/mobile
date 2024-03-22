import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import { useGetMyUserQuery } from '../../../redux/api/users'
import AppBar, { AppBarTitle } from '../../../components/ui/app-bar'
import { AppColors } from '../../../constants/colors'
import AppStrings from '../../../constants/strings'
import { HStack, View } from '@gluestack-ui/themed'
import BackButton from '../../../components/back-button/back-button'
import LoadingView from '../../../components/ui/loading-view'

const UserInfoScreen = ({ navigation }: any) => {
    const { data: user, isFetching } = useGetMyUserQuery()

    return !isFetching ? (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: AppColors.background,
            }}
        >
            <AppBar style={styles.header}>
                <HStack justifyContent="space-between" alignItems="center">
                    <BackButton navigation={navigation} />
                    <AppBarTitle style={{ flex: 1 }} fontSize="$xl">
                        {AppStrings.userInfo}
                    </AppBarTitle>
                    <View />
                </HStack>
            </AppBar>
            <ScrollView contentContainerStyle={styles.scrollView}></ScrollView>
        </SafeAreaView>
    ) : (
        <LoadingView />
    )
}

const styles = StyleSheet.create({
    header: {
        elevation: 12,
        shadowColor: AppColors.text,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    scrollView: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: AppColors.background,
    },
})

export default UserInfoScreen
