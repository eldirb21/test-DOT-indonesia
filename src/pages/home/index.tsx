import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Container, NotFound, Texts} from '@atoms';
import {colors, deviceWidth, fontTypes, scale} from '@utils';
import {ItemCarousel, ItemMovie} from '@molecules';
import Carousel from 'react-native-reanimated-carousel';
import {useIsFocused} from '@react-navigation/native';
import {connect} from 'react-redux';
import {mapDispatchToProps, mapStateToProps} from '@storeSelector';

type Props = {
  [x: string]: any;
};

const Home = (props: Props) => {
  const {movies, loading, banners, favorites, favoriteStatus} = props.appStore;
  const isFocused = useIsFocused();
  const [refresh, setRefresh] = useState(false);
  const [loadingMore, setloadingMore] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (isFocused) {
      getMovies(page, 'Batman');
    }
  }, [isFocused, page]);

  useEffect(() => {
    if (favoriteStatus === 'Success') {
      props.getFavorite();
    }
  }, [favoriteStatus]);

  useEffect(() => {
    if (!loading) {
      setloadingMore(false);
    }
  }, [loading]);

  const getMovies = async (page: number, search: any) => {
    props.fetchMovies({
      page: page,
      type: search,
    });
  };

  const setToFavorite = (item: any) => {
    let isExisting = false;

    const updatedFavorites = favorites.filter((favorite: any) => {
      if (favorite.imdbID === item.imdbID) {
        isExisting = true;
        return false;
      } else return true;
    });

    if (!isExisting) {
      const data = {...item, isFavorite: true};
      updatedFavorites.unshift(data);
    }
    props.addFavorite(updatedFavorites);
  };
  const handlerRefresh = () => {
    setRefresh(true);
    setPage(1);
    getMovies(1, 'Batman');
    setRefresh(false);
  };

  const renderItem = ({item, index}: any) => {
    return (
      <ItemMovie
        key={index}
        horizontal
        image={item?.Poster}
        title={item?.Title}
        isFavorite={true}
        onFavorite={() => setToFavorite(item)}
        onDetail={() => props.navigation.navigate('Details', item)}
        onWatch={() => {}}
        type={item?.Type}
        year={item?.Year}
      />
    );
  };

  const renderEmpty = () => {
    if (loading) return null;
    return <NotFound message="No data found here" />;
  };

  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View style={styles.loadingMore}>
        <ActivityIndicator size="large" color={colors.tintColor} />
      </View>
    );
  };
  const handlerLoadMore = () => {
    if (!loading && !loadingMore) {
      setloadingMore(true);
      setPage(prevPage => prevPage + 1);
    }
  };

  return (
    <Container animated statusbar bgColor={colors.transparent}>
      <Carousel
        loop
        width={deviceWidth}
        height={scale(300)}
        autoPlay={true}
        data={banners}
        scrollAnimationDuration={2000}
        renderItem={({item, index}: any) => (
          <ItemCarousel
            key={index}
            image={item?.Poster}
            title={item?.Title}
            onDetail={() => props.navigation.navigate('Details', item)}
          />
        )}
      />

      <Container>
        <Texts animated style={styles.title}>Movies</Texts>
        <FlatList
          data={movies}
          renderItem={renderItem}
          ListEmptyComponent={renderEmpty}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          onRefresh={handlerRefresh}
          refreshing={refresh}
          onEndReached={handlerLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          keyExtractor={(item: any, index: number) => item?.imdbID + index}
        />
      </Container>
    </Container>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  title: {
    padding: 10,
    marginTop: 15,
    fontFamily: fontTypes.semiBold,
  },
  loadingMore: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: colors.borderColor,
  },
});
