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

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 3rem;
    margin-bottom: -5rem;
  }
`;

export const ReactionTimeContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 5rem;
`;

export const ReactionTimeContent = styled.button`
  background: var(--primary);
  width: 40rem;
  height: 30rem;
  border-radius: 10px;
`;

export const ReactionTimeStart = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--red);
  width: 40rem;
  height: 30rem;
  border-radius: 10px;
  h1 {
    font-size: 5rem;
    color: var(--white);
  }
  h2,
  h3 {
    font-size: 3rem;
    color: var(--white);
  }
`;

export const ReactionClick = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--green);
  width: 40rem;
  height: 30rem;
  border-radius: 10px;

  h1 {
    font-size: 5rem;
    color: var(--white);
  }
  h2,
  h3 {
    font-size: 3rem;
    color: var(--white);
  }
`;

export const ReactionFinished = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--primary);
  width: 40rem;
  height: 30rem;
  border-radius: 10px;

  svg {
    color: var(--white);
    font-size: 3rem;
    margin-bottom: 2rem;
  }
  h2,
  h3 {
    font-size: 3rem;
    color: var(--white);
  }
`;

export const AvarageContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--primary);
  width: 40rem;
  height: 30rem;
  border-radius: 10px;

  svg {
    color: var(--white);
    font-size: 3rem;
    margin-bottom: 2rem;
  }
  h3 {
    font-size: 3rem;
    color: var(--white);
  }

  button {
    margin-top: 2rem;
    width: 10rem;
    height: 2rem;
    background: var(--green);
    color: var(--white);
    transition: 0.2s;
  }

  button:hover {
    filter: brightness(0.9);
  }
`;
