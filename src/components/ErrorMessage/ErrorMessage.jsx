import css from './ErrorMessage.module.css';

export default function ErrorMessage() {
  return (
    <div>
      <p className={css.error}>Oops!Something went wrong, please try again later.</p>
    </div>
  );
}
