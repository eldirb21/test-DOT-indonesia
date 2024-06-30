import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Container, Icons, Texts} from '@atoms';
import {colors, deviceWidth, fonts, fontTypes, scale} from '@utils';
import {Appbar} from '@molecules';

type Props = {
  [x: string]: any;
};

const Details = (props: Props) => {
  const item = props.route.params;
  const [isFavorite, setisFavorite] = useState(true);
  const goBack = () => props.navigation.goBack();

  const onFavorite = () => {
    console.log('press');
  };
  return (
    <Container>
      <Appbar
        styleContainer={styles.appbar}
        withsearch={false}
        shadow={false}
        title="Detail"
        onBack={goBack}
      />
      <Container animated scrolled statusbar bgColor={colors.transparent}>
        <ImageBackground
          resizeMode="contain"
          style={styles.image}
          source={{uri: item?.Poster}}>
          <Image style={styles.imageHover} source={{uri: item?.Poster}} />
        </ImageBackground>

        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Texts style={styles.title}>{item.Title}</Texts>
            <TouchableOpacity
              style={styles.favorite}
              onPress={onFavorite}
              activeOpacity={0.8}>
              <Icons
                name={isFavorite ? 'heart-fill' : 'heart'}
                color={isFavorite ? colors.red : colors.textDefault}
                size={fonts.font16}
                type="Octicons"
              />
              <Texts
                style={{color: isFavorite ? colors.red : colors.textDefault}}>
                {isFavorite ? '' : 'Favorite'}
              </Texts>
            </TouchableOpacity>
          </View>
          <Texts style={styles.desc}>
            {item?.Type}, {item?.Year}
          </Texts>
        </View>
      </Container>
    </Container>
  );
};

export default Details;

const styles = StyleSheet.create({
  appbar: {
    backgroundColor: colors.overlay,
    position: 'absolute',
    left: 0,
    right: 0,
    top: scale(-10),
    zIndex: 9999,
  },
  image: {
    height: deviceWidth + scale(20),
    width: deviceWidth,
    zIndex: 999,
  },
  imageHover: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.5,
    zIndex: -9999,
  },
  favorite: {
    borderRadius: 50,
    justifyContent: 'center',
    height: scale(25),
    marginLeft: scale(6),
    alignItems: 'center',
  },
  content: {
    padding: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scale(8),
  },
  title: {
    fontFamily: fontTypes.medium,
    fontSize: fonts.font14,
    flex: 1,
  },
  desc: {textTransform: 'capitalize'},
});
