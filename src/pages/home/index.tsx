import {FlatList, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Container, NotFound, Texts} from '@atoms';
import {colors, deviceWidth, fonts, scale} from '@utils';
import {ItemCarousel, ItemMovie} from '@molecules';
import Carousel from 'react-native-reanimated-carousel';
import {useIsFocused} from '@react-navigation/native';
import {connect} from 'react-redux';
import {mapDispatchToProps, mapStateToProps} from '@storeSelector';

type Props = {
  [x: string]: any;
};

const Home = (props: Props) => {
  const isFocused = useIsFocused();
  const [Items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [search, setsearch] = useState('');
  const [banners, setbanners] = useState([
    {
      Poster:
        'https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
      Title: 'Batman Begins',
      Type: 'movie',
      Year: '2005',
      imdbID: 'tt0372784',
    },
    {
      Poster:
        'https://m.media-amazon.com/images/M/MV5BOGE2NWUwMDItMjA4Yi00N2Y3LWJjMzEtMDJjZTMzZTdlZGE5XkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg',
      Title: 'The Batman',
      Type: 'movie',
      Year: '2022',
      imdbID: 'tt1877830',
    },
    {
      Poster:
        'https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
      Title: 'Batman v Superman: Dawn of Justice',
      Type: 'movie',
      Year: '2016',
      imdbID: 'tt2975590',
    },
    {
      Poster:
        'https://m.media-amazon.com/images/M/MV5BZWQ0OTQ3ODctMmE0MS00ODc2LTg0ZTEtZWIwNTUxOGExZTQ4XkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_SX300.jpg',
      Title: 'Batman',
      Type: 'movie',
      Year: '1989',
      imdbID: 'tt0096895',
    },
  ]);

  useEffect(() => {
    getFavorite(page, search);
  }, [page, search]);

  const getFavorite = async (page: number, search: string) => {
    const apiKey = 'b9a08658';
    if (page === 1) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }

    try {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${apiKey}&s=${
          search || 'Batman'
        }&page=${page}`,
      );
      const movies = await res?.json();
      setItems(prevItems =>
        page === 1 ? movies?.Search : [...prevItems, ...movies?.Search],
      );
      setLoading(false);
      setLoadingMore(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const renderItem = ({item, index}: any) => {
    return (
      <ItemMovie
        key={index}
        horizontal
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
  };

  const renderEmpty = () => {
    if (loading) return null;
    return <NotFound message="No data found here" />;
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
        onSnapToItem={index => console.log('current index:', index)}
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
        <Texts>Movies</Texts>
        <FlatList
          // key={2} // Change the key to force a re-render
          data={Items}
          renderItem={renderItem}
          ListEmptyComponent={renderEmpty}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          // onRefresh={handlerRefresh}
          refreshing={refresh}
          // onEndReached={handlerLoadMore}
          onEndReachedThreshold={0.5}
          // ListFooterComponent={renderFooter}
          keyExtractor={(item: any, index: number) => item?.imdbID + index}
        />
      </Container>
    </Container>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({});
