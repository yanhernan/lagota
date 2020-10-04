import firestore from '@react-native-firebase/firestore';

export const saveProfile = async (profile: any) => {
  try {
    await firestore().collection('profiles').doc(profile.id).set(profile);
    console.log('User Address Saved!');
  } catch (err) {
    console.warn(err);
  }
};

export const readProfile = async (id: string) => {
  try {
    return await firestore().collection('profiles').doc(id).get();
  } catch (err) {
    console.warn(err);
    return undefined;
  }
};
