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

  button {
    margin-top: 5rem;
    width: 10rem;
    height: 2rem;
    background: var(--blue);
    color: var(--white);
  }
`;

export const TypeContainer = styled.div`
  background: var(--primary);
  padding: 1rem;
  border-radius: 10px;
  margin-top: 2rem;
`;

export const TypeContent = styled.div`
  line-height: 1.6;
  cursor: text;
  span.right {
    background: var(--green);
    color: var(--black);
  }
  span.wrong {
    background: var(--red);
  }
`;

export const PhraseHelpContent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 3rem;
`;
