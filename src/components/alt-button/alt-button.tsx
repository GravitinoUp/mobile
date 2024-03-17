import AppColors from '../../constants/Colors'
import AppButton from '../ui/button'

type AltButtonProps = {
    text: string
    selected?: boolean
    onPress: () => void
}

const AltButton = ({ text, selected, onPress }: AltButtonProps) => {
    return (
        <AppButton
            flex={1}
            h="auto"
            onPress={onPress}
            text={text}
            textProps={{
                fontSize: '$xs',
                color: selected ? AppColors.textOnPrimary : AppColors.text,
            }}
            py={6}
            borderRadius={30}
            borderColor={AppColors.text}
            borderWidth="$2"
            backgroundColor={selected ? AppColors.text : AppColors.background}
        />
    )
}

export default AltButton
