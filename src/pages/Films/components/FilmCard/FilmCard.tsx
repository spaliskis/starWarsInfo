import { Film } from "../../../../types";

type Props = {
  film: Film;
  setSelectedFilmID: (episode_id: number) => void;
};

const FilmCard = ({ film, setSelectedFilmID }: Props) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden h-full">
      <div className="px-6 py-4 h-full">
        <div className="flex justify-between items-center mb-4 gap-4">
          <div className="text-gray-300 text-lg font-bold">{film.title}</div>
          <div className="text-gray-500 text-sm">{film.release_date}</div>
        </div>
        <div className="text-gray-400 text-sm mb-4">
          Episode ID: {film.episode_id}
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-auto"
          onClick={() => setSelectedFilmID(film.episode_id)}
        >
          Show People
        </button>
      </div>
    </div>
  );
};

export default FilmCard;
