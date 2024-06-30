import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {colors, fonts, scale} from '@utils';
import {Texts} from '@atoms';

type Props = {
  image: any;
  title: any;
  onDetail: () => void;
};

const ItemCarousel = ({image, title, onDetail}: Props) => {
  return (
    <TouchableOpacity
      onPress={onDetail}
      activeOpacity={0.9}
      style={styles.card}>
      <ImageBackground source={{uri: image}} style={styles.card}>
        <View style={styles.containerText}>
          <Texts style={styles.text}>{title}</Texts>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default ItemCarousel;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.tintColor,
  },
  containerText: {
    backgroundColor: colors.overlayShadow,
    maxWidth: '60%',
    minWidth: '40%',
    position: 'absolute',
    bottom: scale(40),
    left: 0,
    padding: scale(10),
    borderTopRightRadius: scale(10),
    borderBottomRightRadius: scale(10),
  },
  text: {
    textAlign: 'left',
    color: colors.white,
    fontSize: fonts.font14,
    zIndex: 9999,
  },
});
