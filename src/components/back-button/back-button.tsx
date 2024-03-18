import { ChevronLeftIcon } from '@gluestack-ui/themed'
import IconButton from '../icon-button/icon-button'

const BackButton = ({ navigation }: { navigation: any }) => (
    <IconButton
        icon={<ChevronLeftIcon size="lg" />}
        onPress={() => navigation.goBack()}
    />
)

export default BackButton