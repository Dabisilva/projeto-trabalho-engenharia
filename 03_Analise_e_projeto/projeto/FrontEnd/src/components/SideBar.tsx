import Link from "next/link";
import Router from "next/router";
import {
  Container,
  IconHome,
  IconLeaderBoard,
  ButtonSignOut,
  IconProfile,
} from "../styles/components/SideBar.module";
import { GoSignOut } from "react-icons/go";
export interface SideBarProps {
  namePath?: string;
}

export function SideBar({ namePath }: SideBarProps) {
  function handleSignOut() {
    Router.push("/");
  }

  return (
    <>
      <Container>
        <img src="/icons/SideBarLogo.svg" alt="logo" />

        <div>
          <Link href="/profile">
            <a className={namePath === "profile" ? "activeProfile" : ""}>
              <IconProfile className="profile" />
            </a>
          </Link>
          <Link href="/home">
            <a className={namePath === "home" ? "active" : ""}>
              <IconHome />
            </a>
          </Link>
          <Link href="/leaderboard">
            <a className={namePath === "leaderboard" ? "active" : ""}>
              <IconLeaderBoard />
            </a>
          </Link>
        </div>

        <ButtonSignOut onClick={handleSignOut}>
          <GoSignOut />
        </ButtonSignOut>
      </Container>
    </>
  );
}
