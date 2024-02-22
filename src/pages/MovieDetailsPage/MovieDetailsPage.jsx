import { useState, useRef, useEffect } from 'react';
import { NavLink, Outlet, useLocation, useParams } from 'react-router-dom';
import { Suspense } from 'react';
import BackLink from '../../components/BackLink/BackLink';
import { fetchMoviesDetails } from '../../api';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import css from './MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
  const location = useLocation();
  const backLinkRef = useRef(location.state);
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(false);
        const fetchedData = await fetchMoviesDetails(movieId);
        setMovie(fetchedData);
      } catch (error) {
        if (error.code !== 'ERR_CANCELED') {
          setError(true);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [movieId]);

  return (
    <div>
      <BackLink href={backLinkRef.current ?? '/movies'} />
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {movie && (
        <div>
          <div className={css.container}>
            <div>
              <img
                className={css.image}
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
              />
            </div>
            <div className={css.info}>
              <h1>{movie.title}</h1>
              <p>User Score: {movie.vote_average}</p>
              <h2>Overview</h2>
              <p>{movie.overview}</p>
              <h2>Genres</h2>
              <p> {movie.genres.map(genre => genre.name).join(', ')}</p>
            </div>
          </div>
          <div className={css.items}>
            <NavLink to="cast" className={css.link}>
              Cast
            </NavLink>
            <NavLink to="reviews" className={css.link}>
              Reviews
            </NavLink>
          </div>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </div>
      )}
    </div>
  );
}
