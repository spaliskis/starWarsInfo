import { useEffect, useState } from "react";
import { Person } from "../../../types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { fetchNewPeople } from "../../../features/people/peopleThunks";

const PeopleTable = ({ episode_id }: { episode_id: number }) => {
  const dispatch = useDispatch();
  const films = useSelector((state: RootState) => state.films);
  const people = useSelector((state: RootState) => state.people);

  const [displayedPeople, setDisplayedPeople] = useState<Person[]>([]);

  useEffect(() => {
    const selectedFilm = films.find((film) => film.episode_id === episode_id);
    const personURLs = selectedFilm?.characters;
    const newPeople = personURLs?.filter((personURL: string) => {
      return !people.some((person: Person) => person.url === personURL);
    });

    if (newPeople) {
      dispatch(fetchNewPeople(newPeople) as any);
    }
    const filmPeople = people.filter((person: Person) =>
      personURLs?.includes(person.url)
    );
    setDisplayedPeople(filmPeople);
  }, [dispatch, episode_id, films, people]);

  return (
    <div className="people-table">
      <h4>People Table:</h4>
      {episode_id}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Height</th>
            <th>Mass</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
          {displayedPeople.map((person) => (
            <tr key={person.url}>
              <td>{person.name}</td>
              <td>{person.gender}</td>
              <td>{person.birth_year}</td>
              <td>{person.mass}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PeopleTable;
