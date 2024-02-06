import AddIcon from "../components/icons/AddIcon";
import CancelledIcon from "../components/icons/CancelledIcon";
import InWorkIcon from "../components/icons/InWorkIcon";
import PendingIcon from "../components/icons/PendingIcon";
import PinnedIcon from "../components/icons/PinnedIcon";
import SuccessIcon from "../components/icons/SuccessIcon";
import AppColors from "../constants/Colors";

function renderIconSwitch(key: any): React.JSX.Element {
  switch (key) {
    case 'Создана':
      return (<AddIcon />);
    case 'Назначена':
      return (<PinnedIcon />);
    case 'В работе':
      return (<InWorkIcon />);
    case 'На проверке':
      return (<PendingIcon />);
    case 'Закрыта':
      return (<SuccessIcon color={AppColors.success} />);
    case 'Отменена':
      return (<CancelledIcon />);
    case 'Закрыта с нарушением дедлайна':
      return (<SuccessIcon color={AppColors.error} />);
    default:
      return (<AddIcon />);
  }
};

export default renderIconSwitch;