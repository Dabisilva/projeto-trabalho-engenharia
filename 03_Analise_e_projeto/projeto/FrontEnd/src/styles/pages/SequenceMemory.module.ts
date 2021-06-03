import styled from "styled-components";

export const Container = styled.div`
  display: grid;

  grid-template-columns: 7rem auto;
  grid-template-areas: "SB BC";

  @media (max-width: 500px) {
    display: flex;
    flex-direction: column;
  }
`;

export const Content = styled.div`
  grid-area: "BC";
  height: 100vh;
  margin: 0 18.75rem;
  padding: 2.5rem 2rem;
  max-width: 60rem;
  display: flex;

  flex-direction: column;

  h1 {
    margin-top: 4rem;
    color: var(--title);
    font-weight: 600;
  }
  h2 {
    margin-top: 0.5rem;
    color: var(--text_highlight);
    font-weight: 600;
  }
`;

export const MemoryContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 5rem;
`;

export const MemoryContent = styled.div`
  background: var(--primary);
  border-radius: 0.5rem;
  width: 40rem;
  height: 30rem;
  padding-top: 2rem;

  display: flex;
  align-items: center;
  flex-direction: column;
  span {
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }
`;

export const StartButton = styled.button`
  background: var(--blue_dark);
  width: 10rem;
  height: 3rem;

  color: var(--white);
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 25rem;
`;

export const TapButton = styled.button`
  width: 5rem;
  height: 5rem;
  border-radius: 0.5rem;
  margin: 1rem;
  background: var(--gray_line);
  transition: 0.2s;
  &.active {
    background: var(--blue);
  }
`;
