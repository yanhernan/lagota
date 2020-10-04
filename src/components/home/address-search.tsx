import React, {useEffect, useState, useCallback} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import DialogAddress from './dialog-address';
import {SvgXml} from 'react-native-svg';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import Place from '../../assets/images/place';
import {saveProfile} from '../../service/service-profile';

export type AddressSearchProps = {
  user?: FirebaseAuthTypes.User;
  currentAddress?: any;
  onUpdateAddr: (addr: any) => void;
};

const AddressSearch: React.SFC<AddressSearchProps> = ({
  user,
  currentAddress,
  onUpdateAddr,
}) => {
  const [open, setOpen] = useState(false);
  const onToggle = useCallback(() => {
    setOpen(!open);
  }, [open]);
  useEffect(() => {}, []);
  const onSelected = useCallback(
    async (address) => {
      setOpen(false);
      if (address) {
        onUpdateAddr(address);
        saveProfile({
          id: user?.uid,
          address: address,
        }).then();
      }
    },
    [user, onUpdateAddr],
  );
  return (
    <View style={styles.container}>
      <SvgXml
        style={styles.icon}
        fill={'#000000'}
        width={30}
        height={30}
        xml={Place}
      />
      <TouchableOpacity style={styles.buttom} onPress={onToggle}>
        <View>
          <Text style={styles.textAddressTitle}>Mi Dirección</Text>
          <Text style={styles.textAddress}>
            {currentAddress?.formatted_address ||
              'Por favor ingresa una dirección de envio'}
          </Text>
        </View>
      </TouchableOpacity>
      <DialogAddress open={open} onClose={onToggle} onSelected={onSelected} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: {
      height: 5,
      width: 0,
    },
    //android
    elevation: 3,
  },
  textAddress: {
    fontWeight: '600',
    fontSize: 12,
  },
  textAddressTitle: {
    fontWeight: '700',
    fontSize: 10,
  },
  icon: {
    marginRight: 10,
  },
  buttom: {
    paddingRight: 10,
    flex: 1,
  },
});

export default AddressSearch;
