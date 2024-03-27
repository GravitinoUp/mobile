import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native'

type IconButtonProps = {
    style?: StyleProp<ViewStyle>
    icon: React.ReactNode
    onPress: () => void
}

const IconButton = ({ style, icon, onPress }: IconButtonProps) => (
    <TouchableOpacity
        style={[style, { padding: 8, borderRadius: 100 }]}
        activeOpacity={0.5}
        onPress={onPress}
    >
        {icon}
    </TouchableOpacity>
)

export default IconButton
