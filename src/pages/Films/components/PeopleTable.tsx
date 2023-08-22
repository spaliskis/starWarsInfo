import { useEffect, useState } from "react";
import { Person } from "../../../types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { fetchNewPeople } from "../../../features/people/peopleThunks";
import { FaSpinner } from "react-icons/fa";

const PeopleTable = ({ episodeId }: { episodeId: number }) => {
  const dispatch = useDispatch();
  const films = useSelector((state: RootState) => state.films);
  const people = useSelector((state: RootState) => state.people);
  const selectedFilm = films.find((film) => film.episode_id === episodeId);

  const [displayedPeople, setDisplayedPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setDisplayedPeople([]);
      setIsLoading(true);
      const personURLs = selectedFilm?.characters;
      const newPeople = personURLs?.filter((personURL: string) => {
        return !people.some((person: Person) => person.url === personURL);
      });
      if (newPeople) {
        await dispatch(fetchNewPeople(newPeople) as any);
      }
      const filmPeople = people.filter((person: Person) =>
        personURLs?.includes(person.url)
      );
      setDisplayedPeople(filmPeople);
      setIsLoading(false);
    };
    fetchData();
  }, [dispatch, episodeId, films, people]);

  return (
    <div className="flex flex-col items-center mt-4 w-full">
      <h2 className="text-2xl font-bold mb-4">
        People in '{selectedFilm?.title}'
      </h2>
      {isLoading ? (
        <div className="flex flex-col items-center justify-center m-auto">
          <FaSpinner className="animate-spin text-gray-900 text-4xl" />
          <p className="text-gray-500 text-md">Loading people...</p>
        </div>
      ) : (
        <div className="max-h-screen overflow-y-auto  w-full">
          <table className="table-auto w-full">
            <thead className="sticky top-0">
              <tr className="bg-gray-800 text-gray-100">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Gender</th>
                <th className="px-4 py-2">Birth Year</th>
                <th className="px-4 py-2">Mass</th>
              </tr>
            </thead>
            <tbody>
              {displayedPeople.map((person) => (
                <tr
                  key={person.url}
                  className="bg-gray-700 text-gray-100 hover:bg-gray-600"
                >
                  <td className="border px-4 py-2">{person.name}</td>
                  <td className="border px-4 py-2">{person.gender}</td>
                  <td className="border px-4 py-2">{person.birth_year}</td>
                  <td className="border px-4 py-2">{person.mass}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PeopleTable;
