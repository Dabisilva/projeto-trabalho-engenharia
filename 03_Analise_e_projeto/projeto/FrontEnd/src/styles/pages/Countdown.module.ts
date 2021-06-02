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
  margin: 0 auto;
  padding: 2.5rem 2rem;

  display: flex;
  flex-direction: column;

  section {
    flex: 1;

    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6.25rem;
    align-content: center;
  }
`;
