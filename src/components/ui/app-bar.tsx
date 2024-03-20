import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { AppColors } from '../../constants/colors'

type Props = {
    style?: StyleProp<ViewStyle>
    children?: React.ReactNode
}

const AppBar = ({ style, children }: Props) => (
    <View style={[style, styles.header]}>{children}</View>
)

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 12,
        paddingTop: 30,
        paddingBottom: 16,
        backgroundColor: AppColors.background,
        zIndex: 10,
    },
})

export default AppBar
