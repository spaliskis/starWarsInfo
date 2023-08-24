import { useQuery } from "react-query";
import axiosInstance from "../../../../api";
import { FilmsResponse } from "../../../../types";
import FilmCard from "../FilmCard/FilmCard";
import PeopleTable from "../PeopleTable/PeopleTable";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilms } from "../../../../features/filmsSlice";
import { RootState } from "../../../../store";
import { FaSpinner } from "react-icons/fa";

const Films = () => {
  const dispatch = useDispatch();
  const films = useSelector((state: RootState) => state.films);

  const { data, isLoading, isError } = useQuery("films", async () => {
    const response = await axiosInstance.get<FilmsResponse>("/films");
    if (response) {
      return response.data;
    } else {
      throw new Error("Response is undefined");
    }
  });

  useEffect(() => {
    if (data) {
      dispatch(setFilms(data.results));
    }
  }, [data, dispatch]);

  const [selectedFilmID, setSelectedFilmID] = useState<number>(0);

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center h-full m-auto">
        <FaSpinner className="animate-spin text-gray-900 text-5xl" />
        <p className="text-gray-500 text-lg">Loading films...</p>
      </div>
    );
  if (isError)
    return (
      <div className="flex items-center justify-center h-full m-auto">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">
            Something went wrong. Please try again later.
          </span>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col items-center min-w-full h-full py-6 bg-gray-200">
      <h2 className="text-2xl font-bold mb-4">Films</h2>
      <div className="px-4 sm:px-6 lg:px-8 w-full max-w-screen-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {films?.map((film) => (
            <div key={film.episode_id} className="w-full">
              <FilmCard
                film={film}
                setSelectedFilmID={() => setSelectedFilmID(film.episode_id)}
              />
            </div>
          ))}
        </div>
        {selectedFilmID !== 0 && (
          <div id="people-table" className="mt-12">
            <PeopleTable episodeId={selectedFilmID} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Films;
