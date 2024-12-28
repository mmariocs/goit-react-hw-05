import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../../services/api';
import MovieList from '../../components/MovieList/MovieList';
import s from './MoviePage.module.css';
const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      const searchResults = await searchMovies(query);
      setMovies(searchResults.results);
    };

    fetchMovies();
  }, [query]);

  const handleSubmit = (value) => {
    setSearchParams({ query: value });
  };

  return (
    <div>
      <h1 className={s.text}>Search Movies</h1>
      <form
        className={s.form}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e.target.elements.query.value);
        }}
      >
        <input
          className={s.input}
          name="query"
          type="text"
          defaultValue={query}
        />
        <button className={s.btn} type="submit">
          Search
        </button>
      </form>
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
