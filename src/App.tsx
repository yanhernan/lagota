/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState, useCallback} from 'react';
import {StatusBar} from 'react-native';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import remoteConfig from '@react-native-firebase/remote-config';
import Routes from './navigations/routes';
import LauncherScreen from './navigations/launcher';
import AuthScreen from './navigations/auth';

declare const global: {HermesInternal: null | {}};

const App = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [initializing, setInitializing] = useState<boolean>(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    auth().onAuthStateChanged((userState) => {
      setUser(userState);
      if (loading) {
        console.info('Complete User State');
        setLoading(false);
      }
    });
    remoteConfig()
      .setConfigSettings({
        minimumFetchIntervalMillis: 30000,
      })
      .then();
    remoteConfig()
      .setDefaults({
        apiMap: '',
      })
      .then(() => remoteConfig().fetchAndActivate())
      .catch((err) => {
        console.log('Failed Activated Config.', err);
      })
      .then((fetchedRemotely) => {
        if (fetchedRemotely) {
          console.log('Configs were retrieved from the backend and activated.');
        } else {
          console.log(
            'No configs were fetched from the backend, and the local configs were already activated',
          );
        }
      })
      .catch((err) => {
        console.log('Failed Fetch Data Config.', err);
      });
  }, []);

  const onAnimationEnd = useCallback(() => {
    console.info('Complete Animations');
    setInitializing(false);
  }, []);
  const isCheck = initializing || loading;

  console.info(
    `Is Check: ${isCheck}, Loading: ${loading} / Animations: ${initializing}`,
  );
  // Genero animación mientras verifico usuario
  if (isCheck) {
    return <LauncherScreen onAnimationEnd={onAnimationEnd} />;
  }
  if (!user) {
    return <AuthScreen />;
  } else {
    return (
      <>
        <StatusBar barStyle="light-content" />
        <Routes />
      </>
    );
  }
};

export default App;
