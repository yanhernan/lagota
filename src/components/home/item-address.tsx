import React from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import {SvgXml} from 'react-native-svg';
import Place from '../../assets/images/place';

export type ItemAddressProps = {
  address: string;
  icon?: string;
  onClick: () => void;
};

const ItemAddress: React.SFC<ItemAddressProps> = ({address, icon, onClick}) => {
  return (
    <View style={styles.container}>
      <TouchableHighlight onPress={onClick} style={styles.button}>
        <>
          {icon ? (
            <SvgXml fill="#d4d4d4" style={styles.image} xml={icon} />
          ) : (
            <SvgXml fill="#d4d4d4" style={styles.image} xml={Place!} />
          )}
          <Text style={styles.text}>{address}</Text>
        </>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    borderBottomColor: '#d4d4d4',
    borderBottomWidth: 1,
  },
  button: {
    paddingBottom: 20,
    paddingTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  image: {
    marginLeft: 10,
    marginRight: 10,
    width: 40,
    height: 40,
  },
  text: {
    alignSelf: 'center',
    fontWeight: '300',
    flex: 1,
  },
});

export default ItemAddress;
