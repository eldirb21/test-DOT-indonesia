const ENDPOINTS = {
  getMovies: (type: any, page: number) => `&s=${type}&page=${page}`,
  favorite: 'Favorite',
};
export default ENDPOINTS;
