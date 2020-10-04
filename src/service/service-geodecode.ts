import RemoteConfig from '@react-native-firebase/remote-config';
export const findAddress = async (address: string) => {
  const tokenMap = RemoteConfig().getString('apiMap');
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&language=es-419&region=cl&key=${tokenMap}`;
  try {
    const res = await fetch(url);
    if (res.ok) {
      const response = await res.json();
      if (response.results) {
        return response.results;
      }
    }
  } catch (err) {
    console.error(err);
  }
  return [];
};

export const findAddressCoordinate = async (coordinate: string) => {
  const tokenMap = RemoteConfig().getString('apiMap');
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinate}&language=es-419&region=cl&key=${tokenMap}`;
  try {
    const res = await fetch(url);
    if (res.ok) {
      const response = await res.json();
      if (response.results) {
        return response.results;
      }
    }
  } catch (err) {
    console.error(err);
  }
  return [];
};
