import React, {useState, useCallback, useEffect} from 'react';
import {View, StyleSheet, Dimensions, ActivityIndicator} from 'react-native';
import AddressSearch from '../../components/home/address-search';
import {ScrollView} from 'react-native-gesture-handler';
import ProductList from '../../components/home/product-list';
import Car from '../../components/home/car';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {readProfile, saveProfile} from '../../service/service-profile';
import {createOrder} from '../../service/service-order';
import uuid from 'uuid-random';

const HomeScreen = () => {
  const [user, setUser] = React.useState<FirebaseAuthTypes.User | undefined>(
    undefined,
  );
  const [loading, setLoading] = React.useState(false);
  const [profile, setProfile] = React.useState<any>(undefined);
  const [currentAddress, setCurrentAddress] = React.useState<any>();
  const [products, setProducts] = useState<any[]>([]);
  const onUpdateAddress = (addr: any) => {
    setCurrentAddress(addr);
  };
  const onCreateOrder = useCallback(async () => {
    const order = {
      lines: products,
      phoneNumber: user?.phoneNumber,
      address: currentAddress,
      status: 'pending',
      userId: user?.uid,
      sessionId: uuid(),
      amount: products.reduce((a, p) => a + p.price, 0),
    };
    await createOrder(order);
  }, [products, user, currentAddress]);
  const onCar = useCallback(
    (list: any[]) => {
      if (user && profile) {
        saveProfile({car: list, address: currentAddress, id: user?.uid})
          .then(() => console.info('Profile Updated'))
          .catch(() => console.warn('Profile Updated'));
      }
      setProducts(list);
    },
    [user, currentAddress, profile],
  );
  useEffect(() => {
    const userCurrent = auth().currentUser;
    if (userCurrent) {
      setUser(userCurrent);
      readProfile(userCurrent.uid)
        .then((pro) => {
          setProfile(pro);
          setCurrentAddress(pro?.get('address'));
          setProducts(pro?.get('car') as any);
          setLoading(true);
        })
        .catch(() => {
          setLoading(true);
        });
    } else {
      setLoading(true);
    }
  }, []);

  return (
    <View style={styles.container}>
      {loading && (
        <>
          <AddressSearch
            onUpdateAddr={onUpdateAddress}
            currentAddress={currentAddress}
            user={user}
          />
          <Car onCreate={onCreateOrder} products={products} />
          <ScrollView>
            <ProductList products={products} onProducts={onCar} />
          </ScrollView>
        </>
      )}
      {!loading && <ActivityIndicator />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
});

export default HomeScreen;
