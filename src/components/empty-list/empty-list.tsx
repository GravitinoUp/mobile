import { Text, View } from 'react-native'
import { AppColors } from '../../constants/colors'
import { TaskIcon } from '../icons/TaskIcon'

const EmptyList = ({ label }: { label: string }) => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TaskIcon />
        <Text
            style={{ marginTop: 16, fontSize: 14, color: AppColors.bodyLight }}
        >
            {label}
        </Text>
    </View>
)

export default EmptyList
