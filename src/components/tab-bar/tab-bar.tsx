import {
    NavigationState,
    SceneRendererProps,
    TabBar,
} from 'react-native-tab-view'
import { AppColors } from '../../constants/colors'

type AppTabBarProps = SceneRendererProps & {
    scrollEnabled?: boolean
    navigationState: NavigationState<{
        key: string
        title: string
    }>
}

const AppTabBar = ({ scrollEnabled = false, ...props }: AppTabBarProps) => (
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
        indicatorContainerStyle={{
            backgroundColor: AppColors.background,
        }}
        indicatorStyle={{
            height: 2,
            backgroundColor: AppColors.primary,
        }}
        scrollEnabled={scrollEnabled}
        {...props}
    />
)

export default AppTabBar
