import { render, screen } from "@testing-library/react";
import { SideBar } from "../../components/SideBar";

jest.mock("next/router", () => {
  return {
    useRouter() {
      return {
        asPath: "/",
      };
    },
  };
});

describe("SideBar component", () => {
  it("renders correctly", () => {
    render(<SideBar namePath="home" />);
  });

  it("adds active class if the link as currently active", () => {
    render(<a className={"active"}>Link</a>);

    expect(screen.getByText("Link")).toHaveClass("active");
  });
});
