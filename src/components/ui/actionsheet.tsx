import { StyleProp, ViewStyle } from 'react-native'
import { AppColors } from '../../constants/colors'
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

type ActionsheetContentProps = ComponentProps<typeof ActionsheetContent>
type Props = {
    style?: StyleProp<ViewStyle>
    children?: React.ReactNode
    isOpen: boolean
    onClose: () => void
} & ActionsheetContentProps

const AppActionsheet = ({
    style,
    children,
    isOpen,
    onClose,
    ...props
}: Props) => {
    return (
        <Actionsheet isOpen={isOpen} onClose={onClose} zIndex={999}>
            <ActionsheetBackdrop />
            <ActionsheetContent
                backgroundColor={AppColors.background}
                {...props}
            >
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
