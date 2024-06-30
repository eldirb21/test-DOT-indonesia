import {Api, ENDPOINTS, httpStore, type} from '@utils';

export const fetchMovies = (obj: any) => async (dispatch: any) => {
  dispatch({
    type: type.FETCH_MOVIES,
    loading: true,
  });
  try {
    const response = await Api.get(ENDPOINTS.getMovies(obj?.type, obj?.page));
    const res = await response?.json();

    const limitedBanners = res?.Search?.slice(0, 5);
    dispatch(addBanner(limitedBanners));

    dispatch({
      type: type.FETCH_MOVIES,
      payload: res?.Search,
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

export const getFavorite = () => async (dispatch: any) => {
  dispatch({
    type: type.GET_FAVORITE,
    loading: true,
  });
  const response = await httpStore.getStore(ENDPOINTS.favorite);
  if (response) {
    dispatch({
      type: type.GET_FAVORITE,
      loading: false,
      payload: response,
    });
  } else {
    dispatch({
      type: type.GET_FAVORITE,
      loading: false,
      payload: [],
    });
  }
};
export const addFavorite = (data: any) => async (dispatch: any) => {
  dispatch({
    type: type.ADD_FAVORITE,
    loading: true,
  });
  await httpStore.postStore(ENDPOINTS.favorite, data);

  dispatch({
    type: type.ADD_FAVORITE,
    loading: false,
    payload: 'Success',
  });
};
export const resetaddFavorite = () => async (dispatch: any) => {
  dispatch({
    type: type.ADD_FAVORITE,
    loading: false,
    payload: null,
  });
};

export const addBanner = (data: any) => async (dispatch: any) => {
  dispatch({
    type: type.ADD_BANNER,
    payload: data,
  });
};
