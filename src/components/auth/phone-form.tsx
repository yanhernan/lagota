import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

type PhoneFormViewProps = {};

const PhoneFormView: React.SFC<PhoneFormViewProps> = () => {
  const [phonenumber, setPhonenumber] = useState<string | undefined>(undefined);
  const [code, setCode] = useState<string | undefined>(undefined);
  const [force, setForce] = useState<boolean>(false);
  const [confirm, setConfirm] = useState<
    FirebaseAuthTypes.ConfirmationResult | undefined
  >(undefined);
  const onSend = useCallback(async () => {
    if (phonenumber) {
      try {
        const number = `+569${phonenumber}`;
        console.info(`Telf: ${number}`);
        auth().setLanguageCode('CL');
        const res = await auth().signInWithPhoneNumber(number, force);
        console.info('Telf: ', res);
        setConfirm(res);
      } catch (err) {
        console.error(err);
      }
    }
  }, [phonenumber, force]);

  const onResend = useCallback(async () => {
    setForce(true);
    setConfirm(undefined);
  }, []);

  const onConfirm = useCallback(async () => {
    if (code) {
      try {
        const res = await confirm?.confirm(code);
        if (res && res?.user) {
          console.debug('Auth Success');
        } else {
          console.error('Auth Failed');
        }
      } catch (err) {
        console.error(err);
      }
    }
  }, [confirm, code]);

  return (
    <View style={PhoneStyle.contentPhoneView}>
      <View>
        <Text style={PhoneStyle.textPhoneLabelView}>Teléfono</Text>
        <View style={PhoneStyle.textPhoneInputContentView}>
          <Text>+56 9{confirm && phonenumber}</Text>
          {!confirm && (
            <TextInput
              keyboardType="phone-pad"
              style={PhoneStyle.textPhoneInputView}
              placeholder="Teléfono"
              onChangeText={(text) => setPhonenumber(text)}
            />
          )}
        </View>
      </View>
      {confirm && (
        <View>
          <View>
            <Text style={PhoneStyle.textPhoneLabelView}>
              Código de Verificación
            </Text>
            <TouchableHighlight onPress={onResend}>
              <Text>Reintentar</Text>
            </TouchableHighlight>
          </View>
          <View style={PhoneStyle.textPhoneInputContentView}>
            <TextInput
              keyboardType="number-pad"
              style={PhoneStyle.textPhoneInputView}
              placeholder="Código de Verificación"
              onChangeText={(text) => setCode(text)}
            />
          </View>
        </View>
      )}
      <View style={PhoneStyle.contentTextPhoneView}>
        <Text style={PhoneStyle.textPhoneView}>
          La Gota, necesita tu número de teléfono por favor escribelo y te
          enviaremos un código para validar, tu número de teléfono.
        </Text>
      </View>
      {!confirm && (
        <View style={PhoneStyle.buttonPhone}>
          <Button onPress={onSend} title="Enviar" />
        </View>
      )}
      {confirm && (
        <View>
          <Button onPress={onConfirm} title="Confirmar" />
        </View>
      )}
    </View>
  );
};

const PhoneStyle = StyleSheet.create({
  contentPhoneView: {
    padding: 10,
  },
  contentTextPhoneView: {
    backgroundColor: '#ffffff4f',
    padding: 10,
    borderColor: '#dddddd',
    borderRadius: 10,
    marginBottom: 10,
  },
  textPhoneView: {
    textAlign: 'center',
    fontStyle: 'italic',
  },
  textPhoneLabelView: {
    marginTop: 20,
    fontWeight: '800',
  },
  textPhoneInputContentView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  textPhoneInputView: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    backgroundColor: '#ffffff',
    marginLeft: 10,
    padding: 5,
    borderRadius: 5,
    flex: 1,
  },
  buttonPhone: {
    marginTop: 20,
  },
});

export default PhoneFormView;
