import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import { AppColors } from '../../../constants/colors'
import ProfileButton from './components/profile-button'
import AppStrings from '../../../constants/strings'
import ProfileRoundedIcon from '../../../components/icons/profile-rounded'
import AppearanceRoundedIcon from '../../../components/icons/appearance-rounded'
import NotificationsRoundedIcon from '../../../components/icons/notifications-rounded'
import { HStack, Text, VStack } from '@gluestack-ui/themed'
import { useGetMyUserQuery } from '../../../redux/api/users'
import LoadingView from '../../../components/ui/loading-view'
import TextButton from '../../../components/ui/text-button'
import { Fragment, useState } from 'react'
import Dialog from '../../../components/ui/dialog'
import AppButton from '../../../components/ui/button'
import { CommonActions } from '@react-navigation/native'

export default function ProfileScreen({ navigation }: any) {
    const [isOpen, setOpen] = useState(false)

    const { data: user, isFetching } = useGetMyUserQuery()

    const handleLogout = async () => {
        //await AsyncStorage.clear()
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'LoginScreen' }],
            })
        )
    }

    return !isFetching ? (
        <Fragment>
            <Dialog
                title={AppStrings.logout}
                isOpen={isOpen}
                setOpen={setOpen}
                footer={
                    <HStack gap="$2">
                        <AppButton
                            style={{ flex: 1 }}
                            text={AppStrings.cancel}
                            textProps={{
                                color: AppColors.text,
                                fontSize: '$sm',
                                fontWeight: '$normal',
                            }}
                            px="$1"
                            bgColor={AppColors.transparent}
                            onPress={() => setOpen(false)}
                        />
                        <AppButton
                            style={{ flex: 1 }}
                            textProps={{
                                fontSize: '$sm',
                                fontWeight: '$normal',
                            }}
                            px="$1"
                            text={AppStrings.confirm}
                            onPress={async () => await handleLogout()}
                        />
                    </HStack>
                }
            >
                <Text fontSize="$sm">{AppStrings.logoutDescription}</Text>
            </Dialog>
            <SafeAreaView
                style={{
                    flex: 1,
                    backgroundColor: AppColors.background,
                }}
            >
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <Text
                        textAlign="center"
                        fontSize="$lg"
                        fontWeight="$medium"
                    >
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
                            onPress={() =>
                                navigation.navigate('AppearanceScreen')
                            }
                        />
                        <ProfileButton
                            icon={<NotificationsRoundedIcon />}
                            label={AppStrings.notifications}
                            onPress={() =>
                                navigation.navigate('NotificationsScreen')
                            }
                        />
                        <TextButton
                            textAlign="center"
                            text={AppStrings.logout}
                            onPress={() => setOpen(true)}
                        />
                    </VStack>
                </ScrollView>
            </SafeAreaView>
        </Fragment>
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
