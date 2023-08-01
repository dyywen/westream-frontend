import styles from '../styles/Home.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import Movie from './Movie';


function Home() {

const [allMovies, setAllMovies] = useState([]);
const [genres, setGenres ] = useState([]);

useEffect(() => {
  fetch('http://localhost:3000/movies')
  .then(res => res.json())
  .then(data => {
    setAllMovies(data.movies)
  })
}, []);

useEffect(() => {
  fetch('http://localhost:3000/movies/genre')
  .then(res => res.json())
  .then(data => {
    setGenres(data.genres)
  })
}, []);

const movies = allMovies.map((data, i) => {
  const genreName = data.genre_ids.map(genreId => {
    const genre = genres.find(genre => genre.id === genreId)
    return genre ? genre.name : null
  })
  return <Movie key={i} title={data.title} poster={'https://image.tmdb.org/t/p/original' + data.poster_path} overview={data.overview} date={data.release_date} genres={genreName} voteAverage={data.vote_average} voteCount={data.vote_count} />
})

  return (
    <div>
      <div className={styles.main}>
        <div className={styles.header}>
          <div>
            <img className={styles.logo} src='WeStreamlogo.png' alt='logo' />
          </div>
        </div>
        <div className={styles.moviesContainer}>
          {movies}
        </div>
      </div>
    </div>
  );
}

export default Home;
