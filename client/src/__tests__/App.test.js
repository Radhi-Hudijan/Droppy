import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import App from "../App";
import TEST_ID_HOME from "../pages/Home/Home.testid";

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

describe("Routing", () => {
  it("Path '/' should go to Home page ", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByTestId(TEST_ID_HOME.container)).toBeInTheDocument();
  });
});
