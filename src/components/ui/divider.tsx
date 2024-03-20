import { View } from 'react-native'
import { AppColors } from '../../constants/colors'

const Divider = () => (
    <View
        style={{
            height: 1,
            width: '100%',
            borderRadius: 1,
            borderWidth: 1,
            borderColor: AppColors.border,
            borderStyle: 'dashed',
        }}
    />
)

export default Divider
