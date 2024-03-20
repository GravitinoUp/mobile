import AddIcon from '../icons/AddIcon'
import CancelledIcon from '../icons/CancelledIcon'
import InWorkIcon from '../icons/InWorkIcon'
import PendingIcon from '../icons/PendingIcon'
import AssignedIcon from '../icons/assigned'
import SuccessIcon from '../icons/SuccessIcon'
import { AppColors } from '../../constants/colors'

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
            return <SuccessIcon color={AppColors.success} />
        case 'Отменена':
            return <CancelledIcon />
        case 'Закрыта с нарушением дедлайна':
            return <SuccessIcon color={AppColors.error} />
        default:
            return <AddIcon />
    }
}

export default renderIconSwitch
