import { DEFAULT_HOST } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function getServerHost(): Promise<string> {
  const storage = await AsyncStorage.getItem('persist:root');

  const state = JSON.parse(storage!);
  const auth = JSON.parse(state.auth);

  return auth.host && auth.host != null ? auth.host : DEFAULT_HOST;
}