import { useState, useEffect } from 'react';
import { fetchTrendingMovies } from '../../api';
import MovieList from '../../components/MovieList/MovieList';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loader from '../../components/Loader/Loader';
import css from './HomePage.module.css';

export default function HomePage() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(false);
        const fetchedData = await fetchTrendingMovies();
        setTrendingMovies(fetchedData.results);
      } catch (error) {
        if (error.code !== 'ERR_CANCELED') {
          setError(true);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <h1 className={css.title}>Trending today</h1>
      {trendingMovies.length > 0 && <MovieList movies={trendingMovies} />}
      {error && <ErrorMessage />}
      {loading && <Loader />}
    </>
  );
}
