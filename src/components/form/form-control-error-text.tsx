import { FormControlErrorText } from '@gluestack-ui/themed'
import {
    ErrorInterface,
    FetchResultInterface,
} from '../../types/interface/fetch'
import AppStrings from '../../constants/strings'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { SerializedError } from '@reduxjs/toolkit'

interface AppFormControlErrorTextProps {
    error?: FetchBaseQueryError | SerializedError | undefined
}

const AppFormControlErrorText = ({ error }: AppFormControlErrorTextProps) => {
    const errorData = (error as FetchResultInterface<ErrorInterface>).data

    return (
        <FormControlErrorText>{`${
            errorData ? errorData?.text : AppStrings.defaultError
        }`}</FormControlErrorText>
    )
}

export default AppFormControlErrorText
