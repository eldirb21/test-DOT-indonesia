import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {colors, deviceWidth, fonts, fontTypes, scale} from '@utils';
import {Icons, Texts} from '@atoms';

type Props = {
  image?: any;
  title?: any;
  type?: any;
  year?: any;
  isFavorite?: boolean;
  onFavorite?: () => void;
  onWatch?: () => void;
  onDetail?: () => void;
  horizontal?: boolean;
};

const ImageWithLoader = ({uri, defaultUri, horizontal}: any) => {
  const [loading, setLoading] = useState(true);
  const [imageUri, setImageUri] = useState(uri);

  return (
    <>
      {loading && (
        <View
          style={[
            styles.image,
            horizontal && styles.imageHorizontal,
            styles.loading,
          ]}>
          <ActivityIndicator color={colors.tintColor} size="large" />
        </View>
      )}
      <Image
        style={[styles.image, horizontal && styles.imageHorizontal]}
        source={{uri: imageUri === 'N/A' ? defaultUri : imageUri}}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        onError={() => {
          setLoading(false);
          setImageUri(defaultUri);
        }}
      />
    </>
  );
};

const ItemMovie = ({
  image = '',
  title = '',
  type = '',
  year = '',
  isFavorite = false,
  onFavorite,
  onWatch,
  onDetail,
  horizontal = false,
}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onDetail}
      style={[styles.card, horizontal && styles.cardHorizontal, styles.shadow]}>
      <ImageWithLoader
        uri={image}
        horizontal={horizontal}
        defaultUri="https://icons.veryicon.com/png/o/file-type/suffix-name-file-type/image-151.png"
      />
      <View style={[styles.content, horizontal && styles.contentHorizontal]}>
        <View style={styles.topContent}>
          <View style={styles.desc}>
            <Texts style={styles.title}>{title}</Texts>
            <Texts>
              {type}, {year}
            </Texts>
          </View>
          <TouchableOpacity
            style={[styles.favorite, horizontal && styles.favoriteHorizontal]}
            onPress={onFavorite}
            activeOpacity={0.8}>
            <Icons
              name={isFavorite ? 'heart-fill' : 'heart'}
              color={
                horizontal
                  ? colors.white
                  : isFavorite
                  ? colors.red
                  : colors.textDefault
              }
              size={fonts.font16}
              type="Octicons"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={onWatch}
          activeOpacity={0.8}
          style={[
            styles.watchBtn,
            horizontal && styles.watchBtnHorizontal,
            styles.shadow,
          ]}>
          <Texts style={styles.watchText}>Watch Now</Texts>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(ItemMovie);

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  loading: {
    position: 'absolute',
    bottom: scale(-15),
    left: scale(10),
  },
  card: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    padding: scale(10),
    marginVertical: scale(3),
    marginHorizontal: scale(15),
    borderRadius: 20,
  },
  cardHorizontal: {
    flexDirection: 'column',
    padding: 0,
    width: deviceWidth / 2 - scale(8),
    marginHorizontal: 5,
    justifyContent: 'space-between',
  },
  image: {
    height: '100%',
    minHeight: scale(80),
    width: scale(80),
    borderRadius: 15,
  },
  imageHorizontal: {
    height: scale(180),
    width: '100%',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  content: {
    flex: 1,
    marginLeft: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  contentHorizontal: {
    marginLeft: scale(10),
    paddingVertical: scale(10),
  },
  topContent: {flexDirection: 'row'},
  desc: {flex: 1},
  title: {fontFamily: fontTypes.medium},

  favorite: {
    borderRadius: 50,
    justifyContent: 'center',
    height: scale(25),
    width: scale(25),
    alignItems: 'center',
  },
  favoriteHorizontal: {
    position: 'absolute',
    top: scale(-184),
    right: scale(6),
  },

  watchBtn: {
    backgroundColor: colors.tintColor,
    width: scale(80),
    padding: scale(2),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginTop: scale(10),
  },
  watchBtnHorizontal: {
    position: 'absolute',
    top: scale(-50),
    left: scale(20),
    right: scale(20),
    width: '64%',
  },
  watchText: {
    color: colors.white,
    fontSize: fonts.font10,
  },
});
