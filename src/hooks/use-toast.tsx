import {
    AlertCircleIcon,
    CheckIcon,
    CloseIcon,
    Icon,
    InfoIcon,
    Pressable,
    Toast,
    ToastDescription,
    useToast,
} from '@gluestack-ui/themed'
import { AppColors } from '../constants/colors'

interface ToastProps {
    label: string
    icon?: any
    duration?: number | null | undefined
    placement?:
        | 'top'
        | 'bottom'
        | 'top right'
        | 'top left'
        | 'bottom left'
        | 'bottom right'
        | undefined
}

function useAppToast() {
    const toast = useToast()

    const showToast = ({
        label,
        icon = InfoIcon,
        duration = 3000,
        placement = 'top',
    }: ToastProps) => {
        toast.closeAll()
        toast.show({
            duration,
            placement,
            render: ({ id }) => {
                const toastId = 'toast-' + id
                return (
                    <Toast
                        nativeID={toastId}
                        bgColor={AppColors.background}
                        alignItems="center"
                        borderRadius="$xl"
                    >
                        <Icon as={icon} size="lg" />
                        <ToastDescription mx="$2">{label}</ToastDescription>
                        <Pressable onPress={() => toast.close(id)}>
                            <Icon as={CloseIcon} color={AppColors.text} />
                        </Pressable>
                    </Toast>
                )
            },
        })
    }

    const showSuccessToast = ({
        label,
        icon = CheckIcon,
        duration = 3000,
        placement = 'top',
    }: ToastProps) => {
        toast.closeAll()
        toast.show({
            duration,
            placement,
            render: ({ id }) => {
                const toastId = 'toast-' + id
                return (
                    <Toast
                        nativeID={toastId}
                        bgColor={AppColors.success}
                        alignItems="center"
                        borderRadius="$xl"
                    >
                        <Icon as={icon} size="lg" color="$white" />
                        <ToastDescription mx="$2" color="$white">
                            {label}
                        </ToastDescription>
                        <Pressable onPress={() => toast.close(id)}>
                            <Icon as={CloseIcon} color="$white" />
                        </Pressable>
                    </Toast>
                )
            },
        })
    }

    const showErrorToast = ({
        label,
        icon = AlertCircleIcon,
        duration = 3000,
        placement = 'top',
    }: ToastProps) => {
        toast.closeAll()
        toast.show({
            duration,
            placement,
            render: ({ id }) => {
                const toastId = 'toast-' + id
                return (
                    <Toast
                        nativeID={toastId}
                        bgColor={AppColors.error}
                        alignItems="center"
                        borderRadius="$xl"
                    >
                        <Icon as={icon} size="lg" color="$white" />
                        <ToastDescription mx="$2" color="$white">
                            {label}
                        </ToastDescription>
                        <Pressable onPress={() => toast.close(id)}>
                            <Icon as={CloseIcon} color="$white" />
                        </Pressable>
                    </Toast>
                )
            },
        })
    }

    return { showToast, showSuccessToast, showErrorToast }
}

export { useAppToast }
