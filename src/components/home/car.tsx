import React from 'react';
import {Image, View, StyleSheet, TouchableOpacity, Text} from 'react-native';

export type CarProps = {
  products: any[];
  onCreate: () => void;
};

const Car: React.SFC<CarProps> = ({products, onCreate}) => (
  <View style={styles.container}>
    <View>
      <Image
        style={styles.logo}
        source={require('../../assets/images/logo-blue.png')}
      />
    </View>
    <TouchableOpacity onPress={onCreate}>
      <View>
        <Text style={styles.textTitle}>Mi Pedido</Text>
        <Text>${products.reduce((a, p) => a + p.price, 0)}</Text>
      </View>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  logo: {
    width: 40,
    height: 60,
    marginRight: 20,
  },
  textTitle: {
    fontWeight: '700',
    fontSize: 14,
  },
  container: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: 'whitesmoke',
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: {
      height: 5,
      width: 0,
    },
    //android
    elevation: 3,
    margin: 10,
  },
});
export default Car;
