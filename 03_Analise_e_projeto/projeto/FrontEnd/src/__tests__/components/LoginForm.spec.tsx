import { render, screen } from "@testing-library/react";
import { LoginForm } from "../../components/LoginForm";
import { api } from "../../services/api";

jest.mock("next/router", () => {
  return {
    useRouter() {
      return {
        asPath: "/",
      };
    },
  };
});

describe("LoginForm component", () => {
  it("renders correctly", () => {
    render(<LoginForm/>);
  });

  it("create account button works", () => {
    render(<LoginForm/>);

    expect(screen.getByText("Criar conta")).toBeInTheDocument();
  });
});
