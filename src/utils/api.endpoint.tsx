const ENDPOINTS = {
  getMovies: (type: any, page: number) => `&s=${type}&page=${page}`,
  searchMovies: (type: any, page: number) => `&s=${type}&page=${page}`,
};
export default ENDPOINTS;
