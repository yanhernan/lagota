import {Platform, PermissionsAndroid} from 'react-native';

export const buildPermission = async () => {
  if (Platform.OS === 'ios') {
    return true;
  }
  if (Platform.OS === 'android') {
    return buildPermissionAndroid();
  }
};

const buildPermissionAndroid = async () => {
  try {
    if (
      !(await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ))
    ) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      }
    } else {
      return true;
    }
  } catch (err) {
    console.warn(err);
  }
  return false;
};
