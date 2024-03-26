import { ComponentProps, Fragment, useEffect, useState } from 'react'
import { HStack, Text, View } from '@gluestack-ui/themed'
import { StyleSheet, TouchableOpacity } from 'react-native'
import AppCircularProgress from '../../../../components/circular-progress.tsx/circular-progress'
import BranchIcon from '../../../../components/icons/branch-icon'
import CheckpointIcon from '../../../../components/icons/checkpoint-icon'
import NextIcon from '../../../../components/icons/next-icon'
import OrganizationIcon from '../../../../components/icons/organization-icon'
import Divider from '../../../../components/ui/divider'
import { AppColors } from '../../../../constants/colors'
import AppStrings from '../../../../constants/strings'
import {
    BranchReportInterface,
    CheckpointReportInterface,
    OrganizationReportInterface,
} from '../../../../types/interface/reports'

type ViewProps = ComponentProps<typeof View>
type ReportCardProps = {
    report:
        | BranchReportInterface
        | CheckpointReportInterface
        | OrganizationReportInterface
    onPress?: () => void
} & ViewProps

const ReportCard = ({ report, onPress, ...props }: ReportCardProps) => {
    const [icon, setIcon] = useState(<Fragment />)
    const [title, setTitle] = useState('')

    useEffect(() => {
        if ((report as BranchReportInterface).branch) {
            setIcon(<BranchIcon />)
            setTitle((report as BranchReportInterface).branch.branch_name)
        } else if ((report as CheckpointReportInterface).checkpoint) {
            setIcon(<CheckpointIcon />)
            setTitle(
                (report as CheckpointReportInterface).checkpoint.checkpoint_name
            )
        } else if ((report as OrganizationReportInterface).organization) {
            setIcon(<OrganizationIcon />)
            setTitle(
                (report as OrganizationReportInterface).organization.short_name
            )
        }
    }, [])

    return (
        <TouchableOpacity activeOpacity={1} onPress={onPress}>
            <View
                style={styles.card}
                mb="$5"
                mx="$4"
                borderRadius="$xl"
                {...props}
            >
                <HStack
                    bgColor={AppColors.card}
                    p="$4"
                    pr="$9"
                    borderTopLeftRadius="$xl"
                    borderTopRightRadius="$xl"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <HStack alignItems="center">
                        {icon}
                        <Text
                            style={{ flex: 1 }}
                            ml="$2"
                            fontSize="$sm"
                            fontWeight="$semibold"
                        >
                            {title}
                        </Text>
                    </HStack>
                    {onPress && <NextIcon />}
                </HStack>
                <Divider borderStyle="solid" />
                <View
                    style={{ flexGrow: 1, flexDirection: 'row' }}
                    bgColor={AppColors.background}
                    p="$4"
                    borderBottomLeftRadius="$xl"
                    borderBottomRightRadius="$xl"
                    alignItems="center"
                >
                    <View style={{ width: 32 }}>
                        <AppCircularProgress value={report.completed_percent} />
                    </View>
                    <View mx="$2" style={{ flex: 1 }}>
                        <Text fontSize={12}>{AppStrings.completedTasks}</Text>
                    </View>
                    <View style={{ width: 32 }}>
                        <AppCircularProgress value={report.checked_percent} />
                    </View>
                    <View mx="$2" style={{ flex: 1 }}>
                        <Text fontSize={12}>{AppStrings.checkedTasks}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
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

export default ReportCard
