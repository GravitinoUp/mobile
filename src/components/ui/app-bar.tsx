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
        elevation: 20,
        backgroundColor: AppColors.background,
        shadowColor: AppColors.text,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        zIndex: 10,
    },
})

export default AppBar
