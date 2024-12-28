import { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, Link, Outlet } from 'react-router-dom';
import { getMovieDetails } from '../../services/api';
import s from './MovieDetailsPage.module.css';
const defaultImg =
  'https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const backLink = useRef(location.state ?? '/');

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const movieData = await getMovieDetails(movieId);
        setMovie(movieData);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };
    fetchDetails();
  }, [movieId]);

  if (!movie) return null;

  return (
    <div>
      <Link className={s.btn_go_back} to={backLink.current}>
        Go back
      </Link>
      <div className={s.container}>
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
              : defaultImg
          }
          alt="poster"
          width={250}
        />
        <h1 className={s.title}>{movie.title}</h1>
        <p className={s.text}>{movie.overview}</p>
      </div>
      <nav className={s.nav}>
        <Link className={s.item} to="cast">
          Cast
        </Link>
        <Link className={s.item} to="reviews">
          Reviews
        </Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
