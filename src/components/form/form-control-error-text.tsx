import { FormControlErrorText } from '@gluestack-ui/themed'
import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import AppStrings from '../../constants/strings'
import {
    ErrorInterface,
    FetchResultInterface,
} from '../../types/interface/fetch'

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
