import { Spinner } from '@gluestack-ui/themed'
import { View } from 'react-native'
import { AppColors } from '../../constants/colors'

const LoadingView = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Spinner size={'large'} color={AppColors.primary} />
    </View>
)

export default LoadingView
