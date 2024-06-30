import {Api, ENDPOINTS, type} from '@utils';

export const fetchMovies = (obj: any) => async (dispatch: any) => {
  dispatch({
    type: type.FETCH_MOVIES,
    loading: true,
  });
  try {
    const response = await Api.get(ENDPOINTS.getMovies(obj?.type, obj?.page));

    // const limitedBanners = response?.slice(0, 5);
    // dispatch(addBanner(limitedBanners));

    dispatch({
      type: type.FETCH_MOVIES,
      payload: response.data,
      loading: false,
    });
  } catch (error) {
    dispatch({
      type: type.FETCH_MOVIES,
      payload: null,
      loading: false,
    });
  }
};
export const searchMovies = (obj: any) => async (dispatch: any) => {
  dispatch({
    type: type.SEARCH_MOVIES,
    loading: true,
  });
  try {
    const response = await Api.get(
      ENDPOINTS.searchMovies(obj?.type, obj?.page),
    );
    dispatch({
      type: type.SEARCH_MOVIES,
      payload: response.data,
      loading: false,
    });
  } catch (error) {
    dispatch({
      type: type.SEARCH_MOVIES,
      payload: null,
      loading: false,
    });
  }
};
export const getFavorite = () => async (dispatch: any) => {
  dispatch({
    type: type.GET_FAVORITE,
    loading: true,
  });
};
export const addFavorite = () => async (dispatch: any) => {
  dispatch({
    type: type.ADD_FAVORITE,
    loading: true,
  });
};
export const removeFavorite = () => async (dispatch: any) => {
  dispatch({
    type: type.REMOVE_FAVORITE,
    loading: true,
  });
};
export const getBanner = () => async (dispatch: any) => {
  dispatch({
    type: type.GET_BANNER,
    loading: true,
  });
};
export const addBanner = (data: any) => async (dispatch: any) => {
  dispatch({
    type: type.ADD_BANNER,
    payload: data,
  });
};
