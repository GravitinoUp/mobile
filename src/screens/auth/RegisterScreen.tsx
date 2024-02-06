import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppTextInput from "../../components/AppTextInput";
import AppButton from "../../components/AppButton";
import AppColors from "../../constants/Colors";
import AppStrings from "../../constants/Strings";
import { useEffect, useState } from "react";
import { fetchRegisterUser } from "../../redux/features/AuthSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { fetchOrganizations } from "../../redux/features/OrganizationSlice";
import { IOrganization } from "../../types/interface/organization";
import { FormControl, WarningOutlineIcon } from "native-base";

export default function RegisterScreen({ navigation }: any) {
  const [fio, onChangeFio] = useState('');
  const [email, onChangeEmail] = useState('');
  const [phone, onChangePhone] = useState('');
  const [password, onChangePassword] = useState('');
  const [repeatPassword, onChangeRepeatPassword] = useState('');

  const [genderValue, setGenderValue] = useState('');
  const [organizationValue, setOrganizationValue] = useState<number | null>(null);

  const [isSecondScreen, setSecondScreen] = useState(false);
  const [signUpError, setSignUpError] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const organization = useAppSelector(state => state.organization)

  const [organizations, setOrganizations] = useState<{ key: string, value: string }[]>([]);

  useEffect(() => {
    dispatch(fetchOrganizations());
  }, []);

  useEffect(() => {
    if (organization.organizations) {
      organization.organizations.forEach((o: IOrganization) => {
        setOrganizations(old => [...old, { key: `${o.organization_id}`, value: `${o.short_name}` }]);
      });
    }
  }, [organization]);

  const handleRegister = () => {
    console.log(organizationValue);
    console.log(genderValue.length);

    if (genderValue.length !== 0 && organizationValue !== null) {
      if (password === repeatPassword) {
        const params = {
          last_name: fio.split(' ')[0],
          first_name: fio.split(' ')[1],
          patronymic: fio.split(' ')[2],
          gender_id: genderValue === 'Мужской' ? 1 : 2,
          phone: phone,
          organization_id: organizationValue,
          role_id: 1,
          email: email,
          password: password,
        }

        dispatch(fetchRegisterUser(params));
      }
    }
  };

  const changeScreen = () => {
    if (password.trim() !== '' && password.trim() === repeatPassword.trim()) {
      if (true) { // TODO 
        setSecondScreen(true);
      } else {
        // TODO email exists or other errors
      }
    } else {
      setSignUpError(AppStrings.differentPasswords);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.loginScreenScrollView}>
        <View style={{ flex: 3 }} />
        <Text style={styles.title}>{AppStrings.appName}</Text>
        <Text style={styles.description}>{AppStrings.signUpDescription}</Text>
        {!isSecondScreen ?
          (<FormControl style={{ flex: 1, flexDirection: "column", paddingBottom: 20 }}>
            <AppTextInput
              style={{ marginBottom: 8 }}
              value={email}
              onChangeText={onChangeEmail}
              hint="Email"
              placeholder="Email"
            />
            <FormControl isInvalid={signUpError === AppStrings.differentPasswords}>
              <AppTextInput
                style={{ marginBottom: 8 }}
                value={password}
                onChangeText={onChangePassword}
                hint="Пароль"
                placeholder="Пароль"
                secureTextEntry={true}
              />
              <AppTextInput
                style={{ marginBottom: 8 }}
                value={repeatPassword}
                onChangeText={onChangeRepeatPassword}
                hint="Подтвердите пароль"
                placeholder="Подтвердите пароль"
                secureTextEntry={true}
              />
              <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon />}>
                {signUpError}
              </FormControl.ErrorMessage>
            </FormControl>
          </FormControl>) :
          (<View style={{ flexDirection: "column", gap: 8, paddingBottom: 16 }}>
            <AppTextInput
              value={fio}
              onChangeText={onChangeFio}
              hint="ФИО"
              placeholder="Иванов Иван Иванович"
            />
            <AppTextInput
              value={phone}
              onChangeText={onChangePhone}
              hint="Телефон"
              placeholder="+79000000000"
            />
            <View style={{ flexDirection: "column", gap: 8 }}>
              <View>
                <Text style={[styles.hintText]}>Пол</Text>
                {/* <SelectList
                  setSelected={(value: string) => setGenderValue(value)}
                  data={[{ key: '1', value: 'Мужской' }, { key: '2', value: 'Женский' }]}
                  save="value"
                  search={false}
                  boxStyles={styles.dropdown}
                  dropdownStyles={styles.dropdownScroll}
                  dropdownTextStyles={styles.dropdownText}
                  inputStyles={styles.dropdownText}
                  defaultOption={{ key: '0', value: 'Выберите пол' }}
                /> */}
              </View>
              <View>
                <Text style={[styles.hintText]}>Организация</Text>
                {/* <SelectList
                  setSelected={(key: number) => {
                    setOrganizationValue(key)
                    console.log(organizations);
                  }}
                  data={organizations}
                  save="key"
                  boxStyles={styles.dropdown}
                  dropdownStyles={styles.dropdownScroll}
                  dropdownTextStyles={styles.dropdownText}
                  inputStyles={styles.dropdownText}
                /> */}
              </View>
            </View>
          </View>)
        }
        <View style={{ flex: 1, flexDirection: 'column', gap: 8 }}>
          <AppButton onPress={() => { if (isSecondScreen) { handleRegister() } else { changeScreen() } }} text={!isSecondScreen ? AppStrings.next : AppStrings.register} />
          <TouchableOpacity style={{ marginTop: 12 }} onPress={() => navigation.navigate("LoginScreen")}>
            <Text style={styles.signInUpper}>{AppStrings.hasAccount}</Text>
            <Text style={styles.signInLower}>{AppStrings.signIn}</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 3 }} />
      </ScrollView>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  loginScreenScrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 60,
    paddingVertical: 8,
    backgroundColor: AppColors.background
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: '700',
    color: AppColors.primary,
    textAlign: 'center',
    paddingBottom: 20
  },
  description: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: AppColors.text,
    textAlign: 'center',
    paddingBottom: 20
  },
  hintText: {
    paddingBottom: 6,
  },
  dropdown: {
    borderRadius: 16,
    height: 55,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: AppColors.border
  },
  dropdownScroll: {
    position: 'absolute',
    top: 40,
    width: "100%",
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: AppColors.border
  },
  dropdownText: {
    fontSize: 16,
    color: AppColors.text
  },
  signInUpper: {
    fontSize: 14,
    lineHeight: 21,
    color: AppColors.hint,
    textAlign: 'center'
  },
  signInLower: {
    fontSize: 14,
    lineHeight: 21,
    color: AppColors.primary,
    textAlign: 'center'
  },
});