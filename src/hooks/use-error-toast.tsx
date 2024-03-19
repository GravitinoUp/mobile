import { useEffect } from 'react'
import { useAppToast } from './use-toast'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { SerializedError } from '@reduxjs/toolkit'
import { ErrorInterface } from '../types/interface/fetch'
import AppStrings from '../constants/strings'

export default function useErrorToast(
    error?: FetchBaseQueryError | SerializedError | undefined
) {
    const toast = useAppToast()

    useEffect(() => {
        if (error) {
            const errorData = error as {
                status: number
                data: ErrorInterface | undefined
            }

            toast.showErrorToast({
                label: errorData.data
                    ? errorData.data.text
                    : AppStrings.defaultError,
            })
        }
    }, [error])
}
