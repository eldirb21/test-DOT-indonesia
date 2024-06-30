import {colors, fonts, fontTypes, useTextAnimation} from '@utils';
import React from 'react';
import {StyleSheet, TextProps, Animated} from 'react-native';

interface TextsProps extends TextProps {
  animated?: boolean;
}

const Texts: React.FC<TextsProps> = ({animated = false, ...props}) => {
  const translateYAnim = useTextAnimation(animated);

  const defStyle = [styles.textDefault];
  const incStyle = Array.isArray(props.style) ? props.style : [props.style];

  const textStyles = animated
    ? {transform: [{translateY: translateYAnim}]}
    : {};

  return (
    <Animated.Text {...props} style={[...defStyle, ...incStyle, textStyles]} />
  );
};

const styles = StyleSheet.create({
  textDefault: {
    fontSize: fonts.font12,
    fontFamily: fontTypes.regular,
    color: colors.textDefault,
  },
});

export default Texts;
