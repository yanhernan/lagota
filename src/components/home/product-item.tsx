import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {SvgUri} from 'react-native-svg';

export type ProductItemProps = {
  product: any;
  onAdd: (product: any) => void;
};

const ProductItem: React.SFC<ProductItemProps> = ({product, onAdd}) => {
  const iconType = product.get('iconType');
  console.info('Type: ', iconType);
  return (
    <View style={styles.container}>
      <View style={styles.containerImage}>
        {iconType === 'vector' ? (
          <SvgUri
            fill="#000000"
            style={styles.image}
            uri={product.get('icon')}
          />
        ) : (
          <Image
            style={styles.image}
            source={{
              uri: product.get('icon'),
            }}
          />
        )}
      </View>
      <View>
        <Text>$ {product.get('price')}</Text>
      </View>
      <View style={styles.containerText}>
        <Text style={styles.text}>{product.get('name')}</Text>
      </View>
      <View style={styles.button}>
        <TouchableOpacity
          onPress={() =>
            onAdd({
              price: product.get('price'),
              name: product.get('name'),
              iconType: product.get('iconType'),
              icon: product.get('icon'),
            })
          }>
          <Text>Agregar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
  containerImage: {
    padding: 40,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  containerText: {
    marginTop: 10,
    marginBottom: 10,
  },
  text: {
    fontWeight: '700',
  },
  container: {
    width: Dimensions.get('screen').width / 2.5,
    height: (Dimensions.get('screen').width / 2.5) * 0.9,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    textAlign: 'center',
    backgroundColor: '#6ec1e4',
  },
  buttonText: {},
});

export default ProductItem;
