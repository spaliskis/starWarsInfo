import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import PeopleTable from "./PeopleTable";
import mockPeople from "../../../../mocks/peopleMocks";
import mockFilms from "../../../../mocks/filmMocks";
import { rest } from "msw";
import { setupServer } from "msw/node";

const mockStore = configureStore([thunk]);

const mockEpisodeId = 4;

const server = setupServer(
  rest.get("https://swapi.dev/api/people/:id", (req, res, ctx) => {
    const id = req.params.id;
    const person = mockPeople.find(
      (p) => p.url === `https://swapi.dev/api/people/${id}/`
    );
    if (person) {
      return res(ctx.json(person));
    } else {
      return res(ctx.status(404));
    }
  })
);

const renderPeopleTable = (episodeId: number) => {
  const store = mockStore({
    films: mockFilms,
    people: mockPeople,
  });

  render(
    <Provider store={store}>
      <PeopleTable episodeId={episodeId} />
    </Provider>
  );

  return store;
};

describe("PeopleTable", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("renders the table header", async () => {
    renderPeopleTable(mockEpisodeId);
    await waitFor(() => {
      expect(screen.queryByText("Loading people...")).not.toBeInTheDocument();
    });
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Gender")).toBeInTheDocument();
    expect(screen.getByText("Birth Year")).toBeInTheDocument();
    expect(screen.getByText("Mass")).toBeInTheDocument();
  });

  it("renders the table rows with the correct data", async () => {
    renderPeopleTable(mockEpisodeId);
    await waitFor(() => {
      expect(screen.queryByText("Loading people...")).not.toBeInTheDocument();
    });
    expect(screen.getByText(mockPeople[0].name)).toBeInTheDocument();
    expect(screen.getByText(mockPeople[0].gender)).toBeInTheDocument();
    expect(screen.getByText(mockPeople[0].birth_year)).toBeInTheDocument();
    expect(screen.getByText(mockPeople[0].mass)).toBeInTheDocument();
  });

  it("updates the film data when the episodeId prop changes", async () => {
    renderPeopleTable(mockEpisodeId);
    await waitFor(() => {
      expect(screen.queryByText("Loading people...")).not.toBeInTheDocument();
    });

    expect(screen.getByText(mockPeople[0].name)).toBeInTheDocument();
    expect(screen.getByText(mockPeople[1].name)).toBeInTheDocument();

    renderPeopleTable(mockFilms[1].episode_id);
    await waitFor(() => {
      expect(screen.queryByText("Loading people...")).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("Boba Fett")).toBeInTheDocument();
    });
  });
});
