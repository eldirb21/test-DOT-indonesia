import {StyleSheet, View} from 'react-native';
import React from 'react';
import {colors, deviceHeight, fontTypes, scale} from '@utils';
import Texts from './texts';

type Props = {
  title?: string;
  message?: string;
  style?: any;
};

const NotFound = ({
  title = 'Not Data Found !',
  message = 'No favorites found, please add a favorite movies',
  style,
}: Props) => {
  return (
    <View style={[styles.container, style]}>
      <Texts style={styles.title}>{title}</Texts>
      <Texts style={styles.message}>{message}</Texts>
    </View>
  );
};

export default NotFound;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: deviceHeight,
    paddingHorizontal: scale(40),
  },
  title: {
    fontFamily: fontTypes.medium,
    marginBottom: scale(5),
    textAlign: 'center',
  },
  message: {
    color: colors.colorGrey,
    textAlign: 'center',
  },
});
