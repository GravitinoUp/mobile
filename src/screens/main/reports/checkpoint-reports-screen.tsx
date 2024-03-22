import { useEffect, useState } from 'react'
import AppBar, { AppBarTitle } from '../../../components/ui/app-bar'
import {
    FlatList,
    RefreshControl,
    SafeAreaView,
    StyleSheet,
} from 'react-native'
import { AppColors } from '../../../constants/colors'
import AppInput from '../../../components/ui/input'
import AppStrings from '../../../constants/strings'
import { HStack, SearchIcon } from '@gluestack-ui/themed'
import { CheckpointReportsPayloadInterface } from '../../../types/interface/reports'
import { placeholderQuery } from '../../../constants/constants'
import { useGetCheckpointReportsQuery } from '../../../redux/api/reports'
import EmptyList from '../../../components/empty-list/empty-list'
import ReportCard from './components/report-card'
import LoadingView from '../../../components/ui/loading-view'
import useErrorToast from '../../../hooks/use-error-toast'
import { SettingsIcon } from '../../../components/icons/SettingsIcon'
import { BranchInterface } from '../../../types/interface/branch'
import BackButton from '../../../components/back-button/back-button'

export default function CheckpointReportsScreen({ navigation, route }: any) {
    const branch: BranchInterface = route.params.branch
    const branch_id = branch ? branch.branch_id : -1

    const [search, setSearch] = useState('')

    const [checkpointReportsQuery, setCheckpointReportsQuery] =
        useState<CheckpointReportsPayloadInterface>({
            ...placeholderQuery,
            branch_id,
        })

    const {
        data: reports = { count: 0, data: [] },
        isFetching: checkpointReportsFetching,
        isSuccess: checkpointReportsSuccess,
        error: checkpointReportsError,
        refetch,
    } = useGetCheckpointReportsQuery(checkpointReportsQuery)

    useEffect(() => {
        const delayTimeoutId = setTimeout(() => {
            const nameFilter =
                search.trim().length !== 0
                    ? {
                          checkpoint_name: search.trim(),
                      }
                    : undefined

            setCheckpointReportsQuery({
                ...checkpointReportsQuery,
                filter: {
                    ...checkpointReportsQuery.filter,
                    checkpoint: nameFilter,
                },
            })
        }, 500)
        return () => clearTimeout(delayTimeoutId)
    }, [search, 500])

    useErrorToast(checkpointReportsError)

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: AppColors.background }}
        >
            <AppBar style={styles.header}>
                <HStack alignItems="center">
                    <BackButton navigation={navigation} />
                    <AppInput
                        style={{ flex: 1, marginLeft: 8 }}
                        value={search}
                        onChangeText={setSearch}
                        placeholder={AppStrings.search}
                        leadingIcon={<SearchIcon />}
                        trailingIcon={<SettingsIcon />}
                        onTrailingIconPress={() => {}}
                    />
                </HStack>
                <AppBarTitle mt="$5" fontSize="$lg">
                    {branch.branch_name}
                </AppBarTitle>
            </AppBar>
            {!checkpointReportsFetching && checkpointReportsSuccess ? (
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
                                navigation.navigate(
                                    'OrganizationReportsScreen',
                                    {
                                        checkpoint: item.checkpoint,
                                    }
                                )
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
        paddingLeft: 8,
        elevation: 20,
        shadowColor: AppColors.text,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
})
