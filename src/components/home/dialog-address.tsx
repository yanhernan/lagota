import React, {useState, useCallback} from 'react';
import Modal from 'react-native-modal';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useDebounce} from '../../utils/hook/use-debounce';
import {
  findAddress,
  findAddressCoordinate,
} from '../../service/service-geodecode';
import {buildPermission} from '../../utils/hook/permissionBuilder';
import ItemAddress from './item-address';
import Geolocation from '@react-native-community/geolocation';
import Location from '../../assets/images/my-location';

type DialogAdressProps = {
  open: boolean;
  onClose: () => void;
  onSelected: (address: any) => void;
};

const DialogAdress: React.SFC<DialogAdressProps> = ({
  open,
  onClose,
  onSelected,
}) => {
  const [address, setAddress] = useState<string | undefined>(undefined);
  const [addresses, setAddresses] = useState<any[]>([]);
  const onSearchAddress = useDebounce(async (addr?: string) => {
    if (!addr || addr === '') {
      setAddresses([]);
    } else {
      const resp = await findAddress(addr!);
      setAddresses(resp);
    }
  });
  const onCurrentLocation = useCallback(async () => {
    if (await buildPermission()) {
      Geolocation.getCurrentPosition(async (pos) => {
        const resp = await findAddressCoordinate(
          `${pos.coords.latitude},${pos.coords.longitude}`,
        );
        if (resp.length > 0) {
          onSelected(resp[0]);
        }
        setAddresses(resp);
      });
    }
  }, [onSelected]);
  const onChangeInput = useCallback(
    async (text?: string) => {
      setAddress(text);
      await onSearchAddress(text);
    },
    [onSearchAddress],
  );
  return (
    <Modal style={styles.dialog} isVisible={open}>
      <ScrollView style={styles.containerDialog}>
        <TouchableOpacity onPress={onClose}>
          <Text style={styles.textClose}>X</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.textAddress}>Agrega o escoge un dirección</Text>
          <TextInput
            style={styles.inputSearch}
            onChangeText={onChangeInput}
            placeholder="Escribe un dirección de entrega"
            value={address}
          />
        </View>
        <View style={styles.list}>
          <ItemAddress
            icon={Location}
            address="Mi Ubicación Actual"
            onClick={onCurrentLocation}
          />
          {addresses.map((addr, index) => (
            <ItemAddress
              key={`address-${index}`}
              address={addr.formatted_address}
              onClick={() => {
                onSelected(addr);
              }}
            />
          ))}
        </View>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  containerDialog: {
    backgroundColor: '#ffffff',
    width: Dimensions.get('screen').width,
    padding: 20,
    height: Dimensions.get('screen').height * 0.8,
  },
  textClose: {
    marginLeft: 10,
    fontSize: 20,
  },
  textAddress: {
    fontSize: 26,
    fontWeight: '700',
    margin: 10,
  },
  inputSearch: {
    borderColor: '#6ec1e4',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  dialog: {
    display: 'flex',
    padding: 0,
    margin: 0,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
  },
});

export default DialogAdress;
