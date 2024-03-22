import { HStack, Text } from '@gluestack-ui/themed'
import { TouchableOpacity } from 'react-native'
import { AppColors } from '../../../../constants/colors'

type ProfileButtonProps = {
    icon: React.ReactNode
    label: string
    onPress?: () => {}
}

const ProfileButton = ({ icon, label, onPress }: ProfileButtonProps) => (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        <HStack
            px="$3"
            py="$2"
            borderColor={AppColors.border}
            borderRadius="$xl"
            borderWidth="$1"
            alignItems="center"
        >
            {icon}
            <Text ml="$4" fontSize="$md">
                {label}
            </Text>
        </HStack>
    </TouchableOpacity>
)

export default ProfileButton
