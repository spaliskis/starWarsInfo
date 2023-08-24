import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FilmCard from "./FilmCard";
import mockFilms from "../../../../mocks/filmMocks";

describe("FilmCard", () => {
  const mockFilm = mockFilms[0];
  it("renders the film title, release date and episode ID", () => {
    render(<FilmCard film={mockFilm} setSelectedFilmID={() => {}} />);
    const titleElement = screen.getByText(mockFilm.title);
    const releaseDateElement = screen.getByText(mockFilm.release_date);
    const episodeIDElement = screen.getByText(
      `Episode ID: ${mockFilm.episode_id}`
    );
    expect(titleElement).toBeInTheDocument();
    expect(releaseDateElement).toBeInTheDocument();
    expect(episodeIDElement).toBeInTheDocument();
  });

  it("calls the setSelectedFilmID function when the button is clicked", () => {
    const mockSetSelectedFilmID = jest.fn();
    render(
      <FilmCard film={mockFilm} setSelectedFilmID={mockSetSelectedFilmID} />
    );
    const buttonElement = screen.getByText("Show People");
    userEvent.click(buttonElement);
    expect(mockSetSelectedFilmID).toHaveBeenCalledTimes(1);
    expect(mockSetSelectedFilmID).toHaveBeenCalledWith(mockFilm.episode_id);
  });
});
