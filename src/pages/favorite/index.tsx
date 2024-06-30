import {FlatList, StyleSheet, ActivityIndicator, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Container, NotFound} from '@atoms';
import {colors, scale} from '@utils';
import {Appbar, ItemMovie} from '@molecules';
import {useIsFocused} from '@react-navigation/native';
import {connect} from 'react-redux';
import {mapStateToProps, mapDispatchToProps} from '@storeSelector';

type Props = {
  [x: string]: any;
};

const Favorite = (props: Props) => {
  const isFocused = useIsFocused();
  const [Items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [search, setsearch] = useState(null);
  const goBack = () => props.navigation.replace('TabStack');

  useEffect(() => {
    getFavorite(page, search);
  }, [page, search]);

  console.log(props.appStore);

  const getFavorite = async (page: number, search: any) => {
    props.fetchMovies({
      page: page,
      type: search,
    });
    // const apiKey = 'b9a08658';
    // if (page === 1) {
    //   setLoading(true);
    // } else {
    //   setLoadingMore(true);
    // }

    // try {
    //   const res = await fetch(
    //     `https://www.omdbapi.com/?apikey=${apiKey}&s=${
    //       search //|| 'Batman'
    //     }&page=${page}`,
    //   );
    //   const movies = await res?.json();
    //   console.log(movies, 'movies');

    //   setItems(prevItems =>
    //     page === 1 ? movies?.Search : [...prevItems, ...movies?.Search],
    //   );
    //   setLoading(false);
    //   setLoadingMore(false);
    // } catch (error) {
    //   console.log(error);
    //   setLoading(false);
    //   setLoadingMore(false);
    // }
  };

  const handlerRefresh = () => {
    setRefresh(true);
    setPage(1);
    getFavorite(1, search);
    setRefresh(false);
  };

  const handlerLoadMore = () => {
    if (!loading && !loadingMore) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const renderItem = ({item, index}: any) => (
    <ItemMovie
      key={index}
      image={item?.Poster}
      title={item?.Title}
      isFavorite={true}
      onFavorite={() => {}}
      onDetail={() => props.navigation.navigate('Details', item)}
      onWatch={() => {}}
      type={item?.Type}
      year={item?.Year}
    />
  );

  const renderEmpty = () => {
    if (loading) return null;
    return <NotFound style={{marginTop: scale(-60)}} />;
  };

  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View style={styles.loadingMore}>
        <ActivityIndicator size="large" color={colors.tintColor} />
      </View>
    );
  };

  const handlerSearch = (value: any) => {
    //http://www.omdbapi.com/?s=${searchTerm}&page=${page}
    // const res = await axios(`${proxy}http://www.omdbapi.com/?apikey=${apiKey}&s=${this.query}&type=movie&page=${page}`);

    setsearch(value);
    setPage(1);
  };

  return (
    <Container>
      <Appbar
        title="Favorite"
        onBack={goBack}
        placeholderSearch={'Search favorite'}
        value={search}
        onSearch={handlerSearch}
      />
      <Container animated statusbar bgColor={colors.tintColor}>
        <FlatList
          data={Items}
          renderItem={renderItem}
          ListEmptyComponent={renderEmpty}
          showsVerticalScrollIndicator={false}
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

export default connect(mapStateToProps, mapDispatchToProps)(Favorite);

const styles = StyleSheet.create({
  loadingMore: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: colors.borderColor,
  },
});
