import { Link } from 'react-router-dom';
import css from './BackLink.module.css';

export default function BackLink({ href }) {
  return (
    <div>
      <Link to={href} className={css.link}>
        Go back
      </Link>
    </div>
  );
}
