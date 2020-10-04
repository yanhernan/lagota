import React from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Dimensions,
  StatusBar,
  StyleSheet,
} from 'react-native';
import FadeInView from '../../components/animations/fade-in';

export type LauncherScreenProps = {
  onAnimationEnd?: () => void;
};

const LauncherScreen: React.SFC<LauncherScreenProps> = ({onAnimationEnd}) => (
  <SafeAreaView>
    <View style={styles.constainerLogo}>
      <FadeInView callback={onAnimationEnd}>
        <Image
          style={styles.logo}
          source={require('../../assets/images/logo.png')}
        />
      </FadeInView>
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  constainerLogo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: Dimensions.get('screen').height - (StatusBar.currentHeight || 0),
    width: Dimensions.get('screen').width,
    backgroundColor: '#6ec1e4',
  },
  logo: {
    width: 200,
    height: 220,
    paddingBottom: 40,
  },
});

export default LauncherScreen;
