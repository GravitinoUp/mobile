import { View } from 'react-native'
import AppColors from '../constants/Colors'
import { Spinner } from '@gluestack-ui/themed'

const LoadingView = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Spinner size={'large'} color={AppColors.primary} />
    </View>
)

export default LoadingView
