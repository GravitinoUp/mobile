import { AppColors } from '../../constants/colors'
import AppButton from '../ui/button'

type AltButtonProps = {
    text: string
    selected?: boolean
    onPress: () => void
}

const AltButton = ({ text, selected, onPress }: AltButtonProps) => (
    <AppButton
        flex={1}
        h="auto"
        onPress={onPress}
        text={text}
        textProps={{
            fontSize: '$xs',
            color: selected ? AppColors.textOnPrimary : AppColors.text,
        }}
        px="$1"
        py={6}
        borderRadius={30}
        borderColor={AppColors.text}
        borderWidth="$2"
        backgroundColor={selected ? AppColors.text : AppColors.background}
    />
)

export default AltButton
