import { StyleProp, ViewStyle } from 'react-native'
import AppColors from '../../constants/Colors'
import {
    Actionsheet,
    ActionsheetBackdrop,
    ActionsheetContent,
    ActionsheetDragIndicator,
    ActionsheetDragIndicatorWrapper,
    Box,
    VStack,
} from '@gluestack-ui/themed'
import { ComponentProps } from 'react'

type ActionsheetProps = ComponentProps<typeof Actionsheet>
type Props = {
    style?: StyleProp<ViewStyle>
    children?: React.ReactNode
    isOpen: boolean
    onClose: () => void
} & ActionsheetProps

const AppActionsheet = ({ style, children, isOpen, onClose }: Props) => {
    return (
        <Actionsheet isOpen={isOpen} onClose={onClose} zIndex={999}>
            <ActionsheetBackdrop />
            <ActionsheetContent backgroundColor={AppColors.background}>
                <ActionsheetDragIndicatorWrapper>
                    <ActionsheetDragIndicator />
                </ActionsheetDragIndicatorWrapper>
                <VStack style={style} width="100%" justifyContent={'center'}>
                    {children}
                </VStack>
            </ActionsheetContent>
        </Actionsheet>
    )
}

export default AppActionsheet
