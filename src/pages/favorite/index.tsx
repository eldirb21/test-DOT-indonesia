import {FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Container, NotFound, Spinner} from '@atoms';
import {colors, scale} from '@utils';
import {Appbar, ItemMovie} from '@molecules';
import {useIsFocused} from '@react-navigation/native';
import {connect} from 'react-redux';
import {mapStateToProps, mapDispatchToProps} from '@storeSelector';

type Props = {
  [x: string]: any;
};

const Favorite = (props: Props) => {
  const {loading, favorites} = props.appStore;

  const isFocused = useIsFocused();
  const [refresh, setRefresh] = useState(false);
  const [search, setsearch] = useState(null);
  const [Items, setItems] = useState([]);
  const goBack = () => props.navigation.replace('TabStack');

  useEffect(() => {
    if (isFocused) {
      getFavorite();
    }
  }, [isFocused]);

  useEffect(() => {
    if (favorites?.length > 0) {
      setItems(favorites);
    } else setItems([]);
  }, [favorites]);

  const getFavorite = () => props.getFavorite();

  const handlerRefresh = () => {
    setRefresh(true);
    setTimeout(() => {
      getFavorite();
      setRefresh(false);
    }, 2000);
  };

  const setToFavorite = (item: any) => {
    let isExisting = false;

    const updatedFavorites = favorites?.filter((favorite: any) => {
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
  console.log(favorites);

  const renderItem = ({item, index}: any) => (
    <ItemMovie
      key={index}
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

  const renderEmpty = () => {
    if (loading) return null;
    return <NotFound style={{marginTop: scale(-60)}} />;
  };

  const handlerSearch = (value: any) => {
    setsearch(value);
    if (value === '') setItems(favorites);

    const newFavorite = favorites?.filter((x: any) =>
      x?.Title?.toLowerCase()?.includes(value.toLowerCase()),
    );
    setItems(newFavorite);
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
      <Spinner visible={loading} />
      <Container animated statusbar bgColor={colors.tintColor}>
        <FlatList
          data={Items}
          renderItem={renderItem}
          ListEmptyComponent={renderEmpty}
          showsVerticalScrollIndicator={false}
          onRefresh={handlerRefresh}
          refreshing={refresh}
          onEndReachedThreshold={0.5}
          keyExtractor={(item: any, index: number) => item?.imdbID + index}
        />
      </Container>
    </Container>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorite);
