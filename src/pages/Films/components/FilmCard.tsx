import { Film } from "../../../types";

type Props = {
  film: Film;
  setSelectedFilmID: (episode_id: number) => void;
};

const FilmCard = ({ film, setSelectedFilmID }: Props) => {
  return (
    <div className="film-card">
      <h3>{film.title}</h3>
      <p>Episode ID: {film.episode_id}</p>
      <p>Release Date: {film.release_date}</p>
      <button onClick={() => setSelectedFilmID(film.episode_id)}>
        Show People
      </button>
    </div>
  );
};

export default FilmCard;
