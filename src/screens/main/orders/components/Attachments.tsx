import {
    Dimensions,
    FlatList,
    StyleProp,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native'
import AppColors from '../../../../constants/Colors'
import { CloseIcon, Image, ScrollView, Skeleton } from 'native-base'
import { AddCircleIcon } from '../../../../components/icons/AddCircleIcon'
import { PhotoIcon } from '../../../../components/icons/PhotoIcon'
import { UploadIcon } from '../../../../components/icons/UploadIcon'
import AppStrings from '../../../../constants/Strings'

type CardProps = {
    style?: StyleProp<ViewStyle>
    attachments: any[]
    canDelete: boolean
    canAddMore: boolean
    canAddFiles: boolean
    onAddFilePress?: () => void
    onFileDeletePress?: (index: number) => void
    onMakePhotoPress?: () => void
}

export const AttachmentsCard = ({
    style,
    attachments,
    onAddFilePress,
    onFileDeletePress,
    onMakePhotoPress,
    canDelete,
    canAddMore,
    canAddFiles,
}: CardProps) => (
    <View>
        {canAddFiles && attachments.length < 10 ? (
            <AttachFile
                style={style}
                onPress={() => {
                    onAddFilePress !== undefined ? onAddFilePress() : null
                }}
                icon={<UploadIcon />}
                text={AppStrings.toUpload}
            />
        ) : (
            <View />
        )}
        {attachments.length > 0 ? (
            <View style={[style, styles.attachmentsCard]}>
                <FlatList
                    horizontal
                    contentContainerStyle={styles.scrollView}
                    data={
                        canAddMore && attachments.length < 10
                            ? [...attachments, undefined]
                            : attachments
                    }
                    renderItem={({
                        item,
                        index,
                    }: {
                        item: string
                        index: number
                    }) => (
                        <Attachment
                            attachment={{ uri: item }}
                            onPress={
                                !item && attachments.length < 10
                                    ? onMakePhotoPress
                                    : undefined
                            }
                            onDeletePress={
                                item && canDelete
                                    ? () => onFileDeletePress!(index)
                                    : undefined
                            }
                        />
                    )}
                />
            </View>
        ) : canAddMore ? (
            <View>
                <AttachFile
                    style={style}
                    onPress={() => {
                        onMakePhotoPress !== undefined
                            ? onMakePhotoPress()
                            : null
                    }}
                />
            </View>
        ) : (
            <View />
        )}
    </View>
)

type AttachmentProps = {
    style?: StyleProp<ViewStyle>
    attachment: any
    onPress?: () => void
    onDeletePress?: () => void
}

export const Attachment = ({
    style,
    attachment,
    onPress,
    onDeletePress,
}: AttachmentProps) => {
    return (
        <View style={[style, styles.attachment]}>
            {onDeletePress ? (
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={onDeletePress}
                >
                    <CloseIcon />
                </TouchableOpacity>
            ) : (
                <View />
            )}
            <TouchableOpacity
                activeOpacity={1}
                onPress={onPress}
                style={styles.touchableAttachment}
            >
                {attachment.uri ? (
                    <Image
                        source={attachment}
                        alt=""
                        size={Dimensions.get('window').width / 3 - 38}
                    />
                ) : (
                    <AddCircleIcon />
                )}
            </TouchableOpacity>
        </View>
    )
}

type AttachFileProps = {
    style?: StyleProp<ViewStyle>
    icon?: React.JSX.Element
    text?: string
    onPress: () => void
}

export const AttachFile = ({
    style,
    onPress,
    icon = <PhotoIcon />,
    text = AppStrings.toMakePhoto,
}: AttachFileProps) => (
    <TouchableOpacity
        activeOpacity={0.5}
        style={[style, styles.attachPhotoCard]}
        onPress={onPress}
    >
        {icon}
        <Text
            style={{ paddingTop: 9, fontWeight: '400', color: AppColors.text }}
        >
            <Text
                style={{
                    fontWeight: '600',
                    color: AppColors.primary,
                    textDecorationLine: 'underline',
                }}
            >
                {AppStrings.press}
            </Text>{' '}
            {text}
        </Text>
    </TouchableOpacity>
)

export const AttachmentsShimmer = (style: StyleProp<ViewStyle>) => (
    <View style={[style, styles.attachmentsCard]}>
        <ScrollView horizontal contentContainerStyle={styles.scrollView}>
            <Skeleton
                style={styles.attachment}
                size={Dimensions.get('window').width / 3 - 38}
            />
            <Skeleton
                style={styles.attachment}
                size={Dimensions.get('window').width / 3 - 38}
            />
            <Skeleton
                style={styles.attachment}
                size={Dimensions.get('window').width / 3 - 38}
            />
        </ScrollView>
    </View>
)

const styles = StyleSheet.create({
    attachmentsCard: {
        overflow: 'hidden',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: AppColors.background,
        borderRadius: 14,
        borderWidth: 1.5,
        borderColor: AppColors.border,
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
        gap: 13,
        paddingLeft: 10,
        paddingRight: 10,
        marginVertical: 14,
    },
    touchableAttachment: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    attachment: {
        width: Dimensions.get('window').width / 3 - 38,
        height: Dimensions.get('window').width / 3 - 38,
        backgroundColor: AppColors.card,
        borderRadius: 14,
        borderWidth: 1.5,
        borderColor: AppColors.border,
        overflow: 'hidden',
    },
    attachPhotoCard: {
        alignItems: 'center',
        backgroundColor: AppColors.card,
        borderStyle: 'dashed',
        borderRadius: 14,
        borderWidth: 1.5,
        borderColor: AppColors.border,
        padding: 30,
    },
    deleteButton: {
        position: 'absolute',
        backgroundColor: AppColors.background,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: AppColors.border,
        padding: 4,
        top: 6,
        right: 6,
        zIndex: 999,
    },
})
