import styled from "styled-components";

export const AccountContainer = styled.div`
  height: 100vh;
  max-width: 992px;
  margin: 0 auto;
  padding: 2.5rem 2rem;

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
`;

export const StepsContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 3rem;
  div:first-child {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    border: solid 4px var(--green);
  }
  div:last-child {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    border: solid 4px var(--text_highlight);
  }
`;

export const Separetor = styled.div`
  width: 5rem;
  height: 0.04rem;
  border: solid 2px var(--text_highlight);
`;

export const NextButton = styled.button`
  margin-left: 4rem;
  background: var(--green);
  width: 20rem;
  height: 3rem;
  color: var(--white);
  transition: 0.2s;
  :hover {
    filter: brightness(0.9);
  }
`;
