import {
    AlertDialog,
    AlertDialogBackdrop,
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    CloseIcon,
    HStack,
    Heading,
    Icon,
} from '@gluestack-ui/themed'
import AppButton from './button'

type DialogProps = {
    title: string
    children: React.ReactNode
    footer?: React.ReactNode
    isOpen: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    dismissable?: boolean
}

const Dialog = ({
    title,
    children,
    footer = (
        <HStack justifyContent="flex-end">
            <AppButton text="OK" onPress={() => setOpen(false)} />
        </HStack>
    ),
    isOpen,
    setOpen,
    dismissable = true,
}: DialogProps) => {
    return (
        <AlertDialog
            isOpen={isOpen}
            onClose={() => setOpen(false)}
            closeOnOverlayClick={dismissable}
            isKeyboardDismissable={dismissable}
            size="lg"
        >
            <AlertDialogBackdrop />
            <AlertDialogContent borderRadius="$xl">
                <AlertDialogHeader pb="$1">
                    <Heading size="lg">{title}</Heading>
                    {dismissable && (
                        <AlertDialogCloseButton>
                            <Icon as={CloseIcon} />
                        </AlertDialogCloseButton>
                    )}
                </AlertDialogHeader>
                <AlertDialogBody>{children}</AlertDialogBody>
                <AlertDialogFooter>{footer}</AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default Dialog
