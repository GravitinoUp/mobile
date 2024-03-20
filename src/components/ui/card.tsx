import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { AppColors } from '../../constants/colors'

type Props = {
    style?: StyleProp<ViewStyle>
    children?: React.ReactNode
}

const Card = ({ style, children }: Props) => (
    <View style={[style, styles.card]}>{children}</View>
)

const styles = StyleSheet.create({
    card: {
        borderRadius: 16,
        elevation: 20,
        shadowColor: AppColors.shadowColor,
        backgroundColor: AppColors.background,
    },
})

export default Card
