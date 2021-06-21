import styled from "styled-components";

export const ProfileContainer = styled.div`
  display: grid;

  grid-template-rows: 7rem auto;
  grid-template-columns: 7rem auto;
  grid-template-areas: "SB BC";

  @media (max-width: 500px) {
    display: flex;
    flex-direction: column;
  }
`;

export const Container = styled.div`
  grid-area: "BC";
  height: 100vh;
  max-width: 62rem;
  margin: 0 20rem;
  padding: 2.5rem 2rem;

  display: flex;
  flex-direction: column;

  > div {
    display: flex;
    justify-content: space-between;

    > button {
      margin-top: 4rem;
      width: 5rem;
      height: 2rem;
      background: var(--blue);
      color: var(--white);
    }
  }
  section {
    flex: 1;
    display: flex;
    flex-direction: column;
    max-width: 25rem;
    margin-top: 5rem;
  }
`;
