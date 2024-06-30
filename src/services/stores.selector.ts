import {
  addBanner,
  addFavorite,
  fetchMovies,
  getFavorite,
  resetaddFavorite,
} from './actions/appActions';

const mapStateToProps = (state: any) => ({
  appStore: state.appReducers,
});

const mapDispatchToProps = {
  fetchMovies,
  getFavorite,
  addFavorite,
  addBanner,
  resetaddFavorite,
};

export {mapStateToProps, mapDispatchToProps};
