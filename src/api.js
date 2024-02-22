import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';

const options = {
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOTc2NDEzMWI2MmE1ZTYyZmRiNzY4ODMwODc5OTI4MyIsInN1YiI6IjY1ZDE4MDQwNjY3NTFkMDE4NjMxYTJhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HxtW8bDYFzlM5QXnr7qMPJ4NB_B-hr__tl7lijWmKZE',
  },
};

export const fetchTrendingMovies = async () => {
  const url = `/trending/movie/day?language=en-US`;

  try {
    const response = await axios.get(url, options);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchMovies = async query => {
  const url = `/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;

  try {
    const response = await axios.get(url, options);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchMoviesDetails = async movieId => {
  const url = `/movie/${movieId}?language=en-US`;

  try {
    const response = await axios.get(url, options);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchMoviesCredits = async movieId => {
  const url = `/movie/${movieId}/credits?language=en-US`;

  try {
    const response = await axios.get(url, options);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchMoviesReviews = async movieId => {
  const url = `/movie/${movieId}/reviews?language=en-US&page=1`;

  try {
    const response = await axios.get(url, options);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
