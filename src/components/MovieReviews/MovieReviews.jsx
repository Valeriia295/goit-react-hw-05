import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMoviesReviews } from '../../api';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import css from './MovieReviews.module.css';

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(false);
        const fetchData = await fetchMoviesReviews(movieId);
        setReviews(fetchData.results);
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
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {reviews.length > 0 ? (
        <ul className={css.list}>
          {reviews.map(review => (
            <li key={review.id}>
              <p className={css.author}>Author: {review.author}</p>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className={css.text}>There are no reviews for this movie.</p>
      )}
    </div>
  );
}
