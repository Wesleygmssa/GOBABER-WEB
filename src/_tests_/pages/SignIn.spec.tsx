import React from "react";
import { render } from "@testing-library/react";
import SignIn from "../../page/Signin";

jest.mock("react-router-dom", () => {
  return {
    useHistory: jest.fn(),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

describe("SingnIn page", () => {
  it("should be able to sign in", () => {
    const { debug } = render(<SignIn />);

    debug();
  });
});
