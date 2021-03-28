import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";
import SignIn from "../../pages/Signin";

const mockedHistoryPush = jest.fn();
const mockedSignIn = jest.fn();
const mockedAddToast = jest.fn();

jest.mock("react-router-dom", () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

describe("SingnIn page", () => {
  it("should be able to sign in", () => {
    const { debug } = render(<SignIn />);

    debug();
  });
});
