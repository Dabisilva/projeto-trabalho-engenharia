import styled from "styled-components";
import { FaArrowRight } from "react-icons/fa";

export const LoginContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  > img {
    width: 30rem;
  }
  span {
    font-size: 2.5rem;
    font-weight: 600;
    color: var(--white);
    margin: 3rem 0 2rem 0;
  }
  p {
    font-size: 1.5rem;
    color: var(--title);
    margin-bottom: 3rem;
  }

  @media (max-width: 1280px) {
    width: 1280px;
  }
`;

export const ButtonDisable = styled.button`
  width: 4rem;
  height: 4rem;
  background: var(--blue_dark);
  transition: 0.2s;
  :hover {
    filter: brightness(0.9);
  }
`;
export const ButtonEneble = styled.button`
  width: 4rem;
  height: 4rem;
  background: var(--green);
  transition: 0.2s;
  :hover {
    filter: brightness(0.9);
  }
`;

export const ArrowLogo = styled(FaArrowRight)`
  width: 2rem;
  height: 2rem;
  fill: var(--white);
`;

export const LabelContent = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 2rem;
`;

export const InputContent = styled.input`
  width: 20rem;
  height: 4rem;
  padding: 1rem;

  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  border: none;

  ::placeholder {
    color: var(--text_highlight);
  }

  color: var(--white);
  background: linear-gradient(to right, var(--blue_dark), var(--blue));
`;

export const CreateAccountButton = styled.button`
  margin-top: 3rem;
  background: var(--blue_twitter);

  color: var(--white);
  font-size: 1.5rem;

  width: 24rem;
  height: 4rem;
  transition: 0.2s;
  :hover {
    filter: brightness(0.9);
  }
`;
