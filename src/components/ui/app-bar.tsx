import { ComponentProps } from 'react'
import { Text } from '@gluestack-ui/themed'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { AppColors } from '../../constants/colors'

type Props = {
    style?: StyleProp<ViewStyle>
    children?: React.ReactNode
}

type TextProps = ComponentProps<typeof Text>
type AppBarTitleProps = {
    children: string
} & TextProps

const AppBar = ({ style, children }: Props) => (
    <View style={[styles.header, style]}>{children}</View>
)

export const AppBarTitle = ({ children, ...props }: AppBarTitleProps) => (
    <Text
        fontSize="$2xl"
        fontWeight="$semibold"
        textAlign="center"
        color={AppColors.text}
        {...props}
    >
        {children}
    </Text>
)

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 16,
        backgroundColor: AppColors.background,
        zIndex: 10,
    },
})

export default AppBar
