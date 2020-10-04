import firestore from '@react-native-firebase/firestore';
import functions from '@react-native-firebase/functions';
import {Linking} from 'react-native';

export const createOrder = async (order: any) => {
  const resp = await firestore().collection('orders-inbox').add(order);
  let data: any;
  try {
    order.id = resp.id;
    data = (await functions().httpsCallable('createTransaction')(order)).data;
  } catch (err) {
    console.error(err);
    debugger;
  }
  if (!data) {
    throw new Error('Response Not Found');
  }
  const supported = await Linking.canOpenURL(data.url);
  if (supported) {
    Linking.openURL(`${data.url}?token_ws=${data.token}`).then((resp) => {
      debugger;
    });
  }
};

export const completeOrder = async (orderId: string, status: string) => {
  const orderRef = await firestore()
    .collection('orders-inbox')
    .doc(orderId)
    .get();
  const order = {
    lines: orderRef.get('lines'),
    phoneNumber: orderRef.get('phoneNumber'),
    address: orderRef.get('address'),
    userId: orderRef.get('userId'),
    id: orderRef.id,
    status: status,
  };
  await orderRef.ref.delete();
  const id: string = order.userId as string;
  firestore()
    .collection('orders-history')
    .doc(id)
    .get()
    .then((d) => {
      const orders = (d.get('orders') || []) as any[];
      orders.push(order);
      d.ref.set({orders: orders}).then(() => console.info('History Updated'));
    });
  return order;
};
