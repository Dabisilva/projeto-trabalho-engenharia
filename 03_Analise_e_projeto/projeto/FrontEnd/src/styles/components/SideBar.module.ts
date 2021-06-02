import styled from "styled-components";
import { FiHome, FiAward } from "react-icons/fi";
import { BsPerson } from "react-icons/bs";
export const Container = styled.aside`
  grid-area: "SB";

  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  width: 7rem;
  height: 100vh;
  padding-top: 1rem;
  background: var(--primary);
  img {
    width: 48px;
    height: 42px;
  }
  div {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 12.5rem;
  }

  @media (max-width: 500px) {
    justify-content: center;
    flex-direction: row;
    width: 100%;
    height: 7rem;
    img {
      display: none;
    }
    div {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      height: 7rem;
    }
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 5rem;
    background: none;
    transition: 0.2s;

    &.active,
    &:hover {
      svg {
        stroke: var(--blue);
      }
    }
    &.activeProfile,
    &:hover {
      svg.profile {
        fill: var(--blue);
      }
    }
  }
`;

export const IconProfile = styled(BsPerson)`
  width: 2.5rem;
  height: 2.5rem;
  fill: var(--text);
`;

export const IconHome = styled(FiHome)`
  width: 2rem;
  height: 2rem;
  stroke: var(--text);
`;

export const IconLeaderBoard = styled(FiAward)`
  width: 2rem;
  height: 2rem;
  stroke: var(--text);
`;

export const ButtonSignOut = styled.button`
  background: none;
  margin: 2rem;

  svg {
    fill: var(--red);
    width: 2rem;
    height: 2rem;
  }
`;
