import { VStack } from '@gluestack-ui/themed'
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import BackButton from '../../../components/back-button/back-button'
import AppBar, { AppBarTitle } from '../../../components/ui/app-bar'
import AppInput from '../../../components/ui/input'
import LoadingView from '../../../components/ui/loading-view'
import { AppColors } from '../../../constants/colors'
import AppStrings from '../../../constants/strings'
import { useGetMyUserQuery } from '../../../redux/api/users'

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
                <BackButton navigation={navigation} />
                <AppBarTitle>{AppStrings.userInfo}</AppBarTitle>
            </AppBar>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <VStack gap="$2" mb="$4">
                    <AppInput
                        value={
                            user?.person
                                ? `${user?.person.last_name} ${user?.person.first_name} ${user?.person.patronymic}`
                                : `${user?.organization.short_name}`
                        }
                        readOnly={true}
                        hint={user?.person ? AppStrings.fio : AppStrings.name}
                        placeholder={
                            user?.person ? AppStrings.fio : AppStrings.name
                        }
                    />
                    <AppInput
                        value={
                            user?.person
                                ? `${user?.person.phone}`
                                : `${user?.organization.phone}`
                        }
                        readOnly={true}
                        hint={AppStrings.phone}
                        placeholder={AppStrings.phone}
                    />
                    <AppInput
                        value={`${user?.email}`}
                        readOnly={true}
                        hint="Email"
                        placeholder="Email"
                    />
                </VStack>
                <VStack gap="$2">
                    <AppInput
                        value={
                            user?.group
                                ? `${user?.group?.group_name}`
                                : AppStrings.noGroup
                        }
                        readOnly={true}
                        hint={AppStrings.group}
                        placeholder={AppStrings.group}
                    />
                </VStack>
            </ScrollView>
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
        padding: 32,
        backgroundColor: AppColors.background,
    },
})

export default UserInfoScreen
