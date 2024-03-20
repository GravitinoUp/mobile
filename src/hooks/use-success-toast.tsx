import { useEffect } from 'react'
import { useAppToast } from './use-toast'

export default function useSuccessToast(
    successLabel: string,
    isSuccess: boolean
) {
    const toast = useAppToast()

    useEffect(() => {
        if (isSuccess) {
            toast.showSuccessToast({
                label: successLabel,
            })
        }
    }, [isSuccess])
}
