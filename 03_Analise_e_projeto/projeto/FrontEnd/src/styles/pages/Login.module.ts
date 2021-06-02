import styled from "styled-components";
import { FaArrowRight } from "react-icons/fa";

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  background: var(--blue);

  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export const ImageDiv = styled.div`
  @media (max-width: 1280px) {
    img {
      width: 600px;
      height: 560px;
    }
  }
  @media (max-width: 1020px) {
    img {
      width: 500px;
      height: 460px;
    }
  }
  @media (max-width: 875px) {
    img {
      width: 400px;
      height: 360px;
    }
  }
  @media (max-width: 600px) {
    display: none;
  }
`;
