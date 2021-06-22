import { render } from "@testing-library/react";
import Login from "../../pages";
import { api } from "../../services/api";

jest.mock("next/router");
jest.mock("next-auth/client", () => {
  return {
    useSession() {
      return [null, false];
    },
  };
});

describe("LoginForm component", () => {
  it("renders correctly", () => {
    render(<Login/>);
  });

  it("load login data", async () => {

    const response = await api.post("login", {
        type: "normal",
        email: "teste@gmail.com",
        senha: "12345678"
    })

    expect(response.data).toEqual({
        challenges: 0,
        email: "teste@gmail.com",
        id: 3,
        level: 1,
        nome: "teste",
        xp: 0
    })
  });
});
