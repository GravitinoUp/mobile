import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import { AppColors } from '../../../constants/colors'
import ProfileButton from './components/profile-button'
import AppStrings from '../../../constants/strings'
import ProfileRoundedIcon from '../../../components/icons/profile-rounded'
import AppearanceRoundedIcon from '../../../components/icons/appearance-rounded'
import NotificationsRoundedIcon from '../../../components/icons/notifications-rounded'
import { Text, VStack } from '@gluestack-ui/themed'
import { useGetMyUserQuery } from '../../../redux/api/users'
import LoadingView from '../../../components/ui/loading-view'

export default function ProfileScreen({ navigation }: any) {
    const { data: user, isFetching } = useGetMyUserQuery()

    return !isFetching ? (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: AppColors.background,
            }}
        >
            <ScrollView contentContainerStyle={styles.scrollView}>
                <Text textAlign="center" fontSize="$lg" fontWeight="$medium">
                    {`${user?.person.last_name} ${user?.person.first_name}`}
                </Text>
                <Text
                    textAlign="center"
                    fontSize="$md"
                    color={AppColors.bodyLight}
                >
                    {user?.role.role_name}
                </Text>
                <VStack my="$8" gap="$3">
                    <ProfileButton
                        icon={<ProfileRoundedIcon />}
                        label={AppStrings.settings}
                    />
                    <ProfileButton
                        icon={<AppearanceRoundedIcon />}
                        label={AppStrings.appearance}
                        onPress={() => navigation.navigate('AppearanceScreen')}
                    />
                    <ProfileButton
                        icon={<NotificationsRoundedIcon />}
                        label={AppStrings.notifications}
                    />
                </VStack>
            </ScrollView>
        </SafeAreaView>
    ) : (
        <LoadingView />
    )
}

const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: AppColors.background,
    },
})
