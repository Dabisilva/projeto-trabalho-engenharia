import styled from "styled-components";

export const CountDownContainer = styled.div`
  display: flex;
  align-items: center;
  font-family: Rajdhani;
  font-weight: 600;
  color: var(--title);

  > div {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    background: var(--primary);
    box-shadow: 0 0 60px rgba(0, 0, 0, 0.05);
    border-radius: 5px;
    font-size: 8.5rem;
    text-align: center;
  }

  > div span {
    flex: 1;
  }

  > div span:first-child {
    border-right: 1px solid #f0f1f3;
  }

  > div span:last-child {
    border-left: 1px solid #f0f1f3;
  }

  > span {
    font-size: 6.25rem;
    margin: 0 0.5rem;
  }
`;

export const CountDownButton = styled.button`
  width: 100%;
  height: 5rem;

  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;

  background: var(--blue);
  color: var(--white);

  font-size: 1.25rem;
  font-weight: 600;
  transition: 0.2s;

  :disabled {
    background: var(--primary);
    color: var(--text);
    cursor: not-allowed;
    border-bottom: 3px solid var(--green);
    > img {
      margin-left: 1rem;
    }
  }

  :not(:disabled):hover {
    background: var(--blue_dark);
  }
`;

export const CountDownButtonActive = styled.button`
  width: 100%;
  height: 5rem;

  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 1.25rem;
  font-weight: 600;
  transition: 0.2s;
  background: var(--primary);
  color: var(--title);

  :not(:disabled):hover {
    background: var(--red);
  }
`;
