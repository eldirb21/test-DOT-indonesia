import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Container, Icons, Texts} from '@atoms';
import {colors, deviceWidth, fonts, fontTypes, scale} from '@utils';
import {Appbar} from '@molecules';
import {connect} from 'react-redux';
import {mapStateToProps, mapDispatchToProps} from '@storeSelector';

type Props = {
  [x: string]: any;
};

const Details = (props: Props) => {
  const {favorites, favoriteStatus} = props.appStore;
  const item = props.route.params;
  const [data, setData] = useState<any>({});
  const goBack = () => props.navigation.goBack();

  const fetchDetail = () => {
    const newItem = favorites?.find((x: any) => x?.imdbID === item?.imdbID);
    if (newItem) {
      setData(newItem);
    } else {
      setData(item);
    }
  };

  useEffect(() => {
    fetchDetail();
    if (favoriteStatus === 'Success') {
      fetchDetail();
      props.resetaddFavorite();
      props.getFavorite();
    }
  }, [favoriteStatus, favorites]);

  const setToFavorite = () => {
    let isExisting = false;

    const updatedFavorites = favorites?.filter((favorite: any) => {
      if (favorite.imdbID === data.imdbID) {
        isExisting = true;
        return false;
      }
      return true;
    });

    if (!isExisting) {
      const newdata = {...data, isFavorite: true};
      updatedFavorites?.unshift(newdata);
    }
    props.addFavorite(updatedFavorites);
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
              onPress={setToFavorite}
              activeOpacity={0.8}>
              <Icons
                name={data?.isFavorite ? 'heart-fill' : 'heart'}
                color={data?.isFavorite ? colors.red : colors.textDefault}
                size={fonts.font16}
                type="Octicons"
              />
              {/* <Texts
                style={{
                  color: data?.isFavorite ? colors.red : colors.textDefault,
                }}>
                {data?.isFavorite ? '' : 'Favorite'}
              </Texts> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(Details);

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
