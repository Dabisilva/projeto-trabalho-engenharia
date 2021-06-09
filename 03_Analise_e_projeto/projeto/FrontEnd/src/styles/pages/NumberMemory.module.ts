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

export const NumberContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 5rem;
`;

export const NumberContent = styled.div`
  background: var(--primary);
  border-radius: 0.5rem;
  width: 40rem;
  height: 30rem;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  > span {
    font-size: 3rem;
  }

  > time {
    margin-top: 2rem;
  }
`;

export const StartButton = styled.button`
  background: var(--blue);
  width: 20rem;
  height: 3rem;
  color: var(--white);
`;

export const FormNumber = styled.form`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  height: 40%;

  > span {
    color: var(--title);
    font-weight: 700;
  }
  > input {
    border-radius: 0.5rem;
    background: var(--background);
    border: none;
    height: 2.5rem;
    color: var(--text);
    text-align: center;
  }

  > button {
    background: var(--green);
    color: var(--white);
    width: 7rem;
    height: 2rem;
  }
`;

export const AnswerContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    font-size: 1.5rem;
  }
  span {
    font-size: 2rem;
    font-weight: 700;
    color: var(--title);

    &.right {
      color: var(--green);
    }

    &.error {
      color: var(--red);
    }
  }

  button {
    margin-top: 2rem;
    width: 10rem;
    height: 2rem;
    color: var(--white);
    background: var(--green);

    &.error {
      background: var(--red);
    }
  }
`;
