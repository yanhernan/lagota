import firestore from '@react-native-firebase/firestore';

export const fetchProducts = async () => {
  return await (await firestore().collection('products').get()).docs;
};
