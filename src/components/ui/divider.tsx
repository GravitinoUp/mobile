import { View } from 'react-native'
import { AppColors } from '../../constants/colors'

const Divider = ({
    borderStyle = 'dashed',
}: {
    borderStyle?: 'solid' | 'dotted' | 'dashed' | undefined
}) => (
    <View
        style={{
            height: 1,
            width: '100%',
            borderWidth: 1,
            borderColor: AppColors.border,
            borderStyle: borderStyle,
        }}
    />
)

export default Divider
