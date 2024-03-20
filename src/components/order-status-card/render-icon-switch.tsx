import AddIcon from '../icons/AddIcon'
import CancelledIcon from '../icons/CancelledIcon'
import InWorkIcon from '../icons/InWorkIcon'
import PendingIcon from '../icons/PendingIcon'
import AssignedIcon from '../icons/assigned'
import SuccessIcon from '../icons/SuccessIcon'
import { TASK_STATUS_COLORS } from '../../constants/colors'

function renderIconSwitch(key: any): React.JSX.Element {
    switch (key) {
        case 'Создана':
            return <AddIcon />
        case 'Назначена':
            return <AssignedIcon />
        case 'В работе':
            return <InWorkIcon />
        case 'На проверке':
            return <PendingIcon />
        case 'Закрыта':
            return <SuccessIcon color={TASK_STATUS_COLORS.CLOSED} />
        case 'Отменена':
            return <CancelledIcon />
        case 'Закрыта с нарушением дедлайна':
            return <SuccessIcon color={TASK_STATUS_COLORS.DEADLINE_CLOSED} />
        default:
            return <AddIcon />
    }
}

export default renderIconSwitch
