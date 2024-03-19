import {
    NavigationState,
    SceneRendererProps,
    TabBar,
} from 'react-native-tab-view'
import { AppColors } from '../../constants/colors'

type AppTabBarProps = SceneRendererProps & {
    navigationState: NavigationState<{
        key: string
        title: string
    }>
}

const AppTabBar = ({ ...props }: AppTabBarProps) => {
    return (
        <TabBar
            gap={0}
            tabStyle={{
                minHeight: 'auto',
                paddingVertical: 6,
            }}
            labelStyle={{
                fontSize: 12,
                color: AppColors.text,
                fontWeight: '500',
                textAlign: 'center',
            }}
            indicatorContainerStyle={{ backgroundColor: AppColors.background }}
            indicatorStyle={{
                height: 2,
                backgroundColor: AppColors.primary,
            }}
            {...props}
        />
    )
}

export default AppTabBar
