import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import Films from "./Films";
import mockFilms from "../../../../mocks/filmMocks";
import store from "../../../../store";
import { Film } from "../../../../types";

const renderFilms = (films?: Film[]) => {
  const queryClient = new QueryClient();

  if (films) {
    queryClient.setQueryData("films", { results: films });
  }

  render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Films />
      </QueryClientProvider>
    </Provider>
  );
};

describe("Films", () => {
  it("renders the loading state", () => {
    renderFilms();

    expect(screen.getByText("Loading films...")).toBeInTheDocument();
  });

  it("renders the film cards", async () => {
    renderFilms(mockFilms);

    await waitFor(() => {
      expect(screen.queryByText("Loading people...")).not.toBeInTheDocument();
    });

    expect(await screen.findByText("A New Hope")).toBeInTheDocument();
    expect(
      await screen.findByText("The Empire Strikes Back")
    ).toBeInTheDocument();
  });
});
