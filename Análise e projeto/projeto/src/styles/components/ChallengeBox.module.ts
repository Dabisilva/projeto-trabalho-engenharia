import styled from "styled-components";

export const ChallengeContainer = styled.div`
  height: 100%;

  background: var(--primary);
  border-radius: 5px;
  box-shadow: 0 0 60px rgba(0, 0, 0, 0.05);
  padding: 1.5rem 2rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  text-align: center;
`;

export const ChallengeNotActive = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  strong {
    font-size: 1.5rem;
    font-weight: 500;
    line-height: 1.4;
  }

  p {
    display: flex;
    flex-direction: column;
    align-items: center;
    line-height: 1.4;
    max-width: 70%;
    margin-top: 3rem;
  }

  p img {
    margin-bottom: 1rem;
  }
`;

export const ChallengeActive = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;

  header {
    color: var(--blue);
    font-weight: 600;
    font-size: 1.25rem;
    padding: 0 2rem 1.5rem;
    border-bottom: 1px solid var(--gray_line);
  }

  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  main strong {
    font-size: 2rem;
    font-weight: 600;
    color: var(--title);
    margin: 1.5rem 0 1rem;
  }

  main p {
    line-height: 1.5;
  }

  footer {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  footer button {
    height: 3rem;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 5px;

    color: var(--title);

    font-size: 1rem;
    font-weight: 600;
    transition: filter 0.2s;
  }

  footer button:hover {
    filter: brightness(0.9);
  }

  footer button.challengeFailedButton {
    background: var(--red);
  }

  footer button.challengeCompletedButton {
    background: var(--green);
  }
`;
