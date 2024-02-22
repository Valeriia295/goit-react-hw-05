import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMoviesCredits } from '../../api';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';
import defaultImage from './image.png';
import css from './MovieCast.module.css';

export default function MovieCast() {
  const { movieId } = useParams();
  const [casts, setCasts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(false);
        const fetchedData = await fetchMoviesCredits(movieId);
        setCasts(fetchedData.cast);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [movieId]);

  return (
    <div>
      {error && <ErrorMessage />}
      {loading && <Loader />}
      {casts.length > 0 ? (
        <div>
          <ul className={css.list}>
            {casts.map(cast => (
              <li key={cast.id}>
                <img
                  className={`${css.image} ${!cast.profile_path ? css.defaultImage : ''}`}
                  src={
                    cast.profile_path
                      ? `https://image.tmdb.org/t/p/w500${cast.profile_path}`
                      : defaultImage
                  }
                  alt={cast.name}
                  onError={e => (e.currentTarget.src = defaultImage)}
                />
                <h3 className={css.name}>{cast.name}</h3>
                <p className={css.character}>{cast.character}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className={css.info}>There is no cast information</p>
      )}
    </div>
  );
}
