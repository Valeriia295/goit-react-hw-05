import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import css from './NavBar.module.css';

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function NavBar() {
  return (
    <header className={css.header}>
      <nav className={css.container}>
        <NavLink to="/" className={buildLinkClass}>
          Home
        </NavLink>
        <NavLink to="/movies" className={buildLinkClass}>
          Movies
        </NavLink>
      </nav>
    </header>
  );
}
