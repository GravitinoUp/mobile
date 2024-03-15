import { StyleProp, ViewStyle } from 'react-native'
import AppColors from '../constants/Colors'
import { Actionsheet, ActionsheetContent, Box } from '@gluestack-ui/themed'

type Props = {
    style?: StyleProp<ViewStyle>
    children?: React.ReactNode
    isOpen: boolean
    onClose: () => void
}

const AppActionSheet = ({ style, children, isOpen, onClose }: Props) => {
    return (
        <Actionsheet isOpen={isOpen} onClose={onClose}>
            <ActionsheetContent backgroundColor={AppColors.background}>
                <Box style={style} width="100%" justifyContent={'center'}>
                    {children}
                </Box>
            </ActionsheetContent>
        </Actionsheet>
    )
}

export default AppActionSheet
