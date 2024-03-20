import { SafeAreaView } from 'react-native'
import { AppColors } from '../../../constants/colors'

export default function ProfileScreen() {
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: AppColors.background,
            }}
        ></SafeAreaView>
    )
}
