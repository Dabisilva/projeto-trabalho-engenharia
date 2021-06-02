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
`;

export const CardContainer = styled.div`
  height: 100vh;
  margin: 0 24.75rem;
  padding: 2.5rem 2rem;
  max-width: 62rem;

  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  @media (max-width: 1670px) {
    padding: 1.5rem 1rem;
    max-width: none;
    margin: 0 20rem;
  }
  @media (max-width: 1660px) {
    padding: 1.5rem 1rem;
    max-width: none;
    margin: 0 15rem;
  }
  @media (max-width: 1480px) {
    margin: 0 10rem;
  }
  @media (max-width: 500px) {
    margin: 0 5rem;
  }
`;

export const CardButton = styled.button`
  width: 19.375rem;
  height: 14.6875rem;
  border-radius: 8px;
  padding: 1.875rem;
  margin: 1rem;
  background: var(--primary);
  box-shadow: 0 0 60px rgba(0, 0, 0, 0.05);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  transition: 0.3s;

  span {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--title);
  }
  p {
    color: var(--text);
    font-size: 1rem;
  }

  svg {
    width: 48px;
    height: 10.6875rem;
    color: var(--text_highlight);
  }

  &:hover {
    transform: scale(1.1);
  }

  &:last-child {
    width: 30rem;
  }
`;
