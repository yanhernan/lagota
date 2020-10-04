import React, {useEffect, useState, useCallback} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ProductItem from './product-item';
import {fetchProducts} from '../../service/service-products';

export type ProductListProps = {
  onProducts: (list: any[]) => void;
  products: any[];
};

const ProductList: React.SFC<ProductListProps> = ({
  onProducts,
  products: list,
}) => {
  const [products, serProducts] = useState<any[]>(list);

  const [docs, setDocs] = useState<any[]>([]);
  const onRefreshData = async () => {
    fetchProducts().then((docsReceived) => {
      setDocs(docsReceived);
    });
  };
  useEffect(() => {
    onRefreshData().then();
  }, []);
  useEffect(() => {
    onProducts(products);
  }, [products, onProducts]);
  const onAdd = useCallback(
    (prod: any) => {
      const newList = [...products];
      newList.push(prod);
      serProducts(newList);
    },
    [products],
  );
  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>Nuestros Productos</Text>
      <View style={styles.containerList}>
        {docs.map((doc, index) => (
          <ProductItem key={`product-${index}`} onAdd={onAdd} product={doc} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 20,
    paddingBottom: 140,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,

    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
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
  textTitle: {
    borderBottomColor: '#d4d4d4',
    borderBottomWidth: 1,
    paddingBottom: 20,
    fontSize: 20,
    fontWeight: '700',
  },
  containerList: {
    paddingTop: 10,
  },
});
export default ProductList;
