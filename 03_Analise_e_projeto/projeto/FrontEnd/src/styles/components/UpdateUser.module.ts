import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  form {
    margin-top: 2rem;
    display: flex;
    width: 45rem;
    flex-direction: column;
    align-items: center;
    background: var(--primary);
    border-radius: 8px;
    box-shadow: 0 0 60px rgba(0, 0, 0, 0.05);
    padding: 5rem;
  }

  fieldset {
    border: none;
  }

  legend {
    font-size: 3rem;
    color: var(--white);
    margin-left: 6rem;
  }

  label {
    display: flex;
    flex-direction: column;
    margin: 2rem;
    color: var(--gray_line);
    > button {
      background: none;
      width: 2rem;
      margin-left: 20rem;
      margin-top: -2rem;

      > svg {
        stroke: var(--title);
      }
    }
  }
  input {
    width: 25rem;
    border: none;
    height: 3rem;
    border-radius: 5px;
    margin-top: 0.5rem;
    padding: 0.5rem;

    color: var(--white);
    background: linear-gradient(to right, var(--background), var(--primary));
  }
  button {
    width: 10rem;
    height: 2rem;
    color: var(--white);
    transition: 0.2s;
  }

  .changePassword {
    margin: 2rem;
    background: var(--background);
    margin-top: 0;
  }

  button:hover {
    filter: brightness(0.9);
  }
`;

export const DivButtons = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  .change {
    background: var(--green);
  }
  .cancel {
    background: var(--red);
  }
`;
