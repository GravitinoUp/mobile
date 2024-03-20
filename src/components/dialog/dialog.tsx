import {
    AlertDialog,
    AlertDialogBackdrop,
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogFooter,
    AlertDialogHeader,
    CloseIcon,
    Heading,
    Icon,
} from '@gluestack-ui/themed'

type DialogProps = {
    title: string
    content: React.ReactNode
    footer: React.ReactNode
    isOpen: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Dialog = ({ title, content, footer, isOpen, setOpen }: DialogProps) => {
    return (
        <AlertDialog isOpen={isOpen} onClose={() => setOpen(false)}>
            <AlertDialogBackdrop />
            <AlertDialogHeader>
                <Heading size="lg">{title}</Heading>
                <AlertDialogCloseButton>
                    <Icon as={CloseIcon} />
                </AlertDialogCloseButton>
            </AlertDialogHeader>
            <AlertDialogBody>{content}</AlertDialogBody>
            <AlertDialogFooter>{footer}</AlertDialogFooter>
        </AlertDialog>
    )
}

export default Dialog
