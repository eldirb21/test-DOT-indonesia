import {type} from '@utils';

const initialState = {
  movies: [],
  banners: [],
  favorites: [],
  favoriteStatus: null,
  loading: false,
};

export default (state = initialState, actions: any) => {
  switch (actions.type) {
    case type.FETCH_MOVIES:
      return {...state, movies: actions.payload, loading: actions.loading};

    case type.GET_FAVORITE:
      return {...state, favorites: actions.payload, loading: actions.loading};
    case type.ADD_FAVORITE:
      return {
        ...state,
        favoriteStatus: actions.payload,
        loading: actions.loading,
      };

    case type.ADD_BANNER:
      return {...state, banners: actions.payload, loading: actions.loading};

    default:
      return state;
  }
};
