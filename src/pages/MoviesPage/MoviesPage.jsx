import { useState, useEffect } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import { useSearchParams } from 'react-router-dom';
import { fetchMovies } from '../../api';
import MovieList from '../../components/MovieList/MovieList';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loader from '../../components/Loader/Loader';
import { Toaster } from 'react-hot-toast';
import css from './MoviesPage.module.css';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [noMovies, setNoMovies] = useState(false);
  const [params, setParams] = useSearchParams();

  const query = params.get('query') ?? '';
  const search = NewQuery => {
    params.set('query', NewQuery);
    setParams(params);
    setNoMovies(true);
  };

  useEffect(() => {
    if (query === '') {
      return;
    }

    async function fetchData() {
      try {
        setLoading(true);
        setError(false);
        setNoMovies(false);
        const fetchedData = await fetchMovies(query);
        if (fetchedData.results.length > 0) {
          setMovies(fetchedData.results);
        } else {
          setNoMovies(true);
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [query]);

  return (
    <div>
      <SearchBar onSearch={search} />
      {movies.length > 0 && <MovieList movies={movies} />}
      {noMovies && movies.length === 0 && !loading && !error && (
        <p className={css.text}>No movies found</p>
      )}
      {loading && <Loader />}
      {error && <ErrorMessage />}
      <Toaster position="top-center" />
    </div>
  );
}
