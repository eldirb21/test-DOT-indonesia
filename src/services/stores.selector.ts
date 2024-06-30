import {
  addBanner,
  addFavorite,
  fetchMovies,
  getBanner,
  getFavorite,
  removeFavorite,
  searchMovies,
} from './actions/appActions';

const mapStateToProps = (state: any) => ({
  appStore: state.appReducers,
});

const mapDispatchToProps = {
  fetchMovies,
  searchMovies,
  getFavorite,
  addFavorite,
  removeFavorite,
  getBanner,
  addBanner,
};

export {mapStateToProps, mapDispatchToProps};
