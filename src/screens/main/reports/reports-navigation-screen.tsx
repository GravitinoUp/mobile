import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BranchReportsScreen from './branch-reports-screen'
import CheckpointReportsScreen from './checkpoint-reports-screen'
import OrganizationReportsScreen from './organization-reports-screen'

const Stack = createNativeStackNavigator()

export default function ReportsNavigationScreen() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="BranchReportsScreen"
                component={BranchReportsScreen}
            />
            <Stack.Screen
                name="CheckpointReportsScreen"
                component={CheckpointReportsScreen}
            />
            <Stack.Screen
                name="OrganizationReportsScreen"
                component={OrganizationReportsScreen}
            />
        </Stack.Navigator>
    )
}
