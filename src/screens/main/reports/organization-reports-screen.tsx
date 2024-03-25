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
import { OrganizationReportsPayloadInterface } from '../../../types/interface/reports'
import { placeholderQuery } from '../../../constants/constants'
import EmptyList from '../../../components/empty-list/empty-list'
import ReportCard from './components/report-card'
import LoadingView from '../../../components/ui/loading-view'
import useErrorToast from '../../../hooks/use-error-toast'
import { SettingsIcon } from '../../../components/icons/SettingsIcon'
import { CheckpointInterface } from '../../../types/interface/checkpoint'
import { useGetOrganizationReportsQuery } from '../../../redux/api/reports'
import BackButton from '../../../components/back-button/back-button'

export default function OrganizationReportsScreen({ navigation, route }: any) {
    const checkpoint: CheckpointInterface = route.params.checkpoint
    const checkpoint_id = checkpoint ? checkpoint.checkpoint_id : -1

    const [search, setSearch] = useState('')

    const [organizationReportsQuery, setOrganizationReportsQuery] =
        useState<OrganizationReportsPayloadInterface>({
            ...placeholderQuery,
            checkpoint_id,
        })

    const {
        data: reports = { count: 0, data: [] },
        isFetching: organizationReportsFetching,
        isSuccess: organizationReportsSuccess,
        error: organizationReportsError,
        refetch,
    } = useGetOrganizationReportsQuery(organizationReportsQuery)

    useEffect(() => {
        const delayTimeoutId = setTimeout(() => {
            const nameFilter =
                search.trim().length !== 0
                    ? {
                          short_name: search.trim(),
                      }
                    : undefined

            setOrganizationReportsQuery({
                ...organizationReportsQuery,
                filter: {
                    ...organizationReportsQuery.filter,
                    organization: nameFilter,
                },
            })
        }, 500)
        return () => clearTimeout(delayTimeoutId)
    }, [search, 500])

    useErrorToast(organizationReportsError)

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
                    {checkpoint.checkpoint_name}
                </AppBarTitle>
            </AppBar>
            {!organizationReportsFetching && organizationReportsSuccess ? (
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