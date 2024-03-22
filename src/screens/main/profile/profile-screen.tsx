import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'
import { AppColors, COLOR_SCHEMES } from '../../../constants/colors'
import ProfileButton from './components/profile-button'
import AppStrings from '../../../constants/strings'
import ProfileRoundedIcon from '../../../components/icons/profile-rounded'
import { HStack, Text, VStack, View } from '@gluestack-ui/themed'
import { useGetMyUserQuery } from '../../../redux/api/users'
import LoadingView from '../../../components/ui/loading-view'
import TextButton from '../../../components/ui/text-button'
import { Fragment, useState } from 'react'
import Dialog from '../../../components/ui/dialog'
import AppButton from '../../../components/ui/button'
import { CommonActions } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AppBar, { AppBarTitle } from '../../../components/ui/app-bar'

export default function ProfileScreen({ navigation }: any) {
    const [isOpen, setOpen] = useState(false)

    const { data: user, isFetching } = useGetMyUserQuery()

    const [appearanceColor, setAppearanceColor] = useState(AppColors.primary)

    const handleChangeAppearance = async (selectedColor: string) => {
        AppColors.primary = selectedColor
        await AsyncStorage.setItem('appearance', selectedColor)
        setAppearanceColor(selectedColor)

        navigation.navigate({ name: 'ProfileNavigationScreen' })
    }

    const handleLogout = async () => {
        await AsyncStorage.clear()

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
                <AppBar style={styles.header}>
                    <AppBarTitle>{AppStrings.settings}</AppBarTitle>
                </AppBar>
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
                            label={AppStrings.userInfo}
                            onPress={() =>
                                navigation.navigate('UserInfoScreen')
                            }
                        />
                        <Text mt="$4">{AppStrings.colorScheme}</Text>
                        <HStack gap="$4">
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
                        <Text mt="$4">{AppStrings.notifications}</Text>
                        {/*TODO Switches*/}
                        <TextButton
                            mt="$10"
                            textAlign="center"
                            text={AppStrings.logout}
                            color={AppColors.error}
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
