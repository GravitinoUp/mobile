import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "./ProfileScreen";

const Stack = createNativeStackNavigator();

export default function ProfileNavigationScreen({ navigation }: any) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name='ProfileScreen'
        component={ProfileScreen}
      />
    </Stack.Navigator>
  );
}