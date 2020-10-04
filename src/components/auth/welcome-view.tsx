import React from 'react';
import {Text, Image, Button, StyleSheet, Dimensions, View} from 'react-native';

export type WelcomeViewProps = {
  onNext: (value: number) => void;
};

const WelcomeView: React.SFC<WelcomeViewProps> = ({onNext}) => (
  <>
    <View style={WelcomeViewStyle.containerContent}>
      <Text style={WelcomeViewStyle.textWelcome}>Bienvenido(a)</Text>
      <Image
        style={WelcomeViewStyle.imageWelcome}
        source={require('../../assets/images/logo.png')}
      />

      <View style={WelcomeViewStyle.buttonWelcome}>
        <Button onPress={() => onNext(1)} title="Comenzar">
          <Text>Comenzar</Text>
        </Button>
      </View>
    </View>
  </>
);

const WelcomeViewStyle = StyleSheet.create({
  textWelcome: {
    fontSize: 18,
  },
  containerContent: {
    paddingTop: 40,
    margin: 40,
    display: 'flex',
    alignItems: 'center',
  },
  imageWelcome: {
    margin: 20,
    width: 200,
    height: 150,
  },
  buttonWelcome: {
    width: Dimensions.get('screen').width - 30,
    height: 40,
  },
});

export default WelcomeView;
