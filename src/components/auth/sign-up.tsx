import React, {useState, useCallback} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import WelcomeView from './welcome-view';
import PhoneForm from './phone-form';

const SignUpView = () => {
  const [step, setStep] = useState(0);
  const onNext = useCallback((nextValue: number) => {
    setStep(nextValue);
  }, []);
  const renderStep = useCallback(() => {
    switch (step) {
      case 0:
        return <WelcomeView onNext={onNext} />;
      case 1:
        return <PhoneForm />;
    }
  }, [onNext, step]);
  return <View style={SignUpStyles.signUpContainer}>{renderStep()}</View>;
};

const SignUpStyles = StyleSheet.create({
  signUpContainer: {
    display: 'flex',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: '#d4d4d4',
    alignItems: 'center',
  },
});

export default SignUpView;
