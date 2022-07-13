import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

/**
 * We use the App component to test here as it will do the routing for us.
 * This allows our test to be more user centric!
 */
import App from "../../App";
import TEST_ID_HOME from "../../pages/Home/Home.testid";
import TEST_ID_NAV from "../Header/Nav.testid";
import { getUsersSuccessMock } from "../../__testUtils__/fetchUserMocks";

//Taken from https://stackoverflow.com/questions/39830580/jest-test-fails-typeerror-window-matchmedia-is-not-a-function
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    dispatchEvent: jest.fn(),
  })),
});

beforeEach(() => {
  fetch.resetMocks();
});

describe("Navigation", () => {
  it("Clicking on the Home link should go to Home page ", async () => {
    fetch.mockResponseOnce(getUsersSuccessMock());

    render(
      <MemoryRouter history={history} initialEntries={["/user"]}>
        <App />
      </MemoryRouter>
    );

    expect(
      screen.queryByTestId(TEST_ID_HOME.container)
    ).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId(TEST_ID_NAV.linkToHome));

    await waitFor(() =>
      expect(screen.getByTestId(TEST_ID_HOME.container)).toBeInTheDocument()
    );
  });
});
