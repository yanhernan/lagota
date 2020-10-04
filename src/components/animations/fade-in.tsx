import React, {useRef} from 'react';
import {Animated, StyleProp, ViewStyle} from 'react-native';

export type FadeInProps = {
  style?: StyleProp<ViewStyle>;
  callback?: Animated.EndCallback;
};

const FadeInView: React.SFC<FadeInProps> = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    }).start(props.callback);
  }, [fadeAnim, props.callback]);
  const style: ViewStyle = (props.style || {}) as ViewStyle;
  return (
    <Animated.View // Special animatable View
      style={{
        ...style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}>
      {props.children}
    </Animated.View>
  );
};

export default FadeInView;
