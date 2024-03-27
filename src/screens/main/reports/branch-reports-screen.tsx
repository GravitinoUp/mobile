import { useEffect, useState } from 'react'
import { SearchIcon } from '@gluestack-ui/themed'
import {
    FlatList,
    RefreshControl,
    SafeAreaView,
    StyleSheet,
} from 'react-native'
import ReportCard from './components/report-card'
import EmptyList from '../../../components/empty-list/empty-list'
import { SettingsIcon } from '../../../assets/icons/SettingsIcon'
import AppBar, { AppBarTitle } from '../../../components/ui/app-bar'
import AppInput from '../../../components/ui/input'
import LoadingView from '../../../components/ui/loading-view'
import { AppColors } from '../../../constants/colors'
import { placeholderQuery } from '../../../constants/constants'
import AppStrings from '../../../constants/strings'
import useErrorToast from '../../../hooks/use-error-toast'
import { useGetBranchReportsQuery } from '../../../redux/api/reports'
import { BranchReportsPayloadInterface } from '../../../types/interface/reports'

export default function BranchReportsScreen({ navigation }: any) {
    const [search, setSearch] = useState('')

    const [branchReportsQuery, setBranchReportsQuery] =
        useState<BranchReportsPayloadInterface>(placeholderQuery)

    const {
        data: reports = { count: 0, data: [] },
        isFetching: branchReportsFetching,
        isSuccess: branchReportsSuccess,
        error: branchReportsError,
        refetch,
    } = useGetBranchReportsQuery(branchReportsQuery)

    useEffect(() => {
        const delayTimeoutId = setTimeout(() => {
            const nameFilter =
                search.trim().length !== 0
                    ? {
                          branch_name: search.trim(),
                      }
                    : undefined

            setBranchReportsQuery({
                ...branchReportsQuery,
                filter: {
                    ...branchReportsQuery.filter,
                    branch: nameFilter,
                },
            })
        }, 500)
        return () => clearTimeout(delayTimeoutId)
    }, [search, 500])

    useErrorToast(branchReportsError)

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: AppColors.background }}
        >
            <AppBar style={styles.header}>
                <AppInput
                    value={search}
                    onChangeText={setSearch}
                    placeholder={AppStrings.search}
                    leadingIcon={<SearchIcon />}
                    trailingIcon={<SettingsIcon />}
                    onTrailingIconPress={() => {}}
                />
                <AppBarTitle mt="$5" fontSize="$lg">
                    {AppStrings.branches}
                </AppBarTitle>
            </AppBar>
            {!branchReportsFetching && branchReportsSuccess ? (
                <FlatList
                    contentContainerStyle={{ flexGrow: 1 }}
                    refreshControl={
                        <RefreshControl
                            refreshing={false}
                            onRefresh={() => {
                                refetch()
                            }}
                        />
                    }
                    ListEmptyComponent={
                        <EmptyList label={AppStrings.emptyReportList} />
                    }
                    data={reports.data}
                    renderItem={({ item, index }) => (
                        <ReportCard
                            mt={index === 0 ? '$5' : undefined}
                            report={item}
                            onPress={() =>
                                navigation.navigate('CheckpointReportsScreen', {
                                    branch: item.branch,
                                })
                            }
                        />
                    )}
                />
            ) : (
                <LoadingView />
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        elevation: 12,
        shadowColor: AppColors.text,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
})
