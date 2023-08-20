import { useQuery } from "react-query";
import axiosInstance from "../../api";
import { FilmsResponse } from "../../types";
import FilmCard from "./components/FilmCard";
import PeopleTable from "./components/PeopleTable";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilms } from "../../features/filmsSlice";
import { RootState } from "../../store";

const Films = () => {
  const dispatch = useDispatch();
  const films = useSelector((state: RootState) => state.films);

  const { data, isLoading, isError } = useQuery("films", async () => {
    const response = await axiosInstance.get<FilmsResponse>("/films");
    return response.data;
  });

  useEffect(() => {
    if (data) {
      dispatch(setFilms(data.results));
    }
  }, [data, dispatch]);

  const [selectedFilmID, setSelectedFilmID] = useState<number>(0);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong</div>;

  return (
    <div>
      {films?.map((film) => (
        <FilmCard
          key={film.episode_id}
          film={film}
          setSelectedFilmID={() => setSelectedFilmID(film.episode_id)}
        />
      ))}
      <PeopleTable episode_id={selectedFilmID} />
    </div>
  );
};

export default Films;
