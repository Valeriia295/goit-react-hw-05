import toast from 'react-hot-toast';
import css from './SearchBar.module.css';

export default function SearchBar({ onSearch }) {
  const handleSubmit = evt => {
    evt.preventDefault();

    if (evt.target.elements.query.value.trim() === '') {
      toast.error('Enter your query!');
      return;
    }

    onSearch(evt.target.elements.query.value);
    evt.target.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input className={css.input} type="text" name="query" autoComplete="off" autoFocus />
      <button className={css.button} type="submit">
        Search
      </button>
    </form>
  );
}
