import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useEffect, useRef, useState} from 'react';
import {Animated, Easing} from 'react-native';

const useScreenAnimation = (animated = false) => {
  const slideAnim = useRef(new Animated.Value(500)).current;

  useEffect(() => {
    if (animated) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1500,
        easing: Easing.out(Easing.sin),
        useNativeDriver: true,
      }).start();
    }
  }, [animated, slideAnim]);

  useFocusEffect(
    useCallback(() => {
      if (animated) {
        slideAnim.setValue(300);
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 1500,
          easing: Easing.out(Easing.sin),
          useNativeDriver: true,
        }).start();
      }

      return () => {
        ///
      };
    }, [animated, slideAnim]),
  );

  return slideAnim;
};
const useTextAnimation = (animated = false, value = 30) => {
  const [translateYAnim] = useState(new Animated.Value(value));

  useEffect(() => {
    if (animated) {
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    }
  }, [animated, translateYAnim]);

  return translateYAnim;
};

export {useScreenAnimation, useTextAnimation};
