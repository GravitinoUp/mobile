import {
    StyleProp,
    StyleSheet,
    TouchableOpacity,
    ViewStyle,
} from 'react-native'
import AppColors from '../../constants/Colors'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { HStack } from '@gluestack-ui/themed'

type BottomBarProps = {
    style?: StyleProp<ViewStyle>
    children?: React.ReactNode
}

export const BottomBar = ({ style, children }: BottomBarProps) => (
    <HStack style={[style, styles.bottomBar]}>{children}</HStack>
)

type BottomNavBarProps = {
    props: BottomTabBarProps
    isVisible: boolean
}

export const BottomNavBar = ({ props, isVisible }: BottomNavBarProps) => {
    return (
        <HStack style={[styles.bottomNavBar, { height: isVisible ? 100 : 0 }]}>
            {props.state.routes.map((route, index) => {
                const isFocused = props.state.index === index

                const { options } = props.descriptors[route.key]
                const icon = options.tabBarIcon!({
                    focused: isFocused,
                    color: isFocused ? AppColors.primary : AppColors.hint,
                    size: 24,
                })

                const onPress = () => {
                    const event = props.navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    })

                    if (!isFocused && !event.defaultPrevented) {
                        props.navigation.navigate(route.name, route.params)
                    }
                }

                return isVisible ? (
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        activeOpacity={0.5}
                        key={route.key}
                        onPress={onPress}
                    >
                        {icon}
                    </TouchableOpacity>
                ) : undefined
            })}
        </HStack>
    )
}

const styles = StyleSheet.create({
    bottomBar: {
        elevation: 20,
        shadowColor: AppColors.text,
        backgroundColor: AppColors.background,
        height: 100,
        paddingHorizontal: 16,
    },
    bottomNavBar: {
        elevation: 20,
        shadowColor: AppColors.text,
        backgroundColor: AppColors.background,
    },
})
