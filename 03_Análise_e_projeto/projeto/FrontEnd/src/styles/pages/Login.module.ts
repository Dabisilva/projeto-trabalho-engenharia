import styled from "styled-components";
import { FaArrowRight } from "react-icons/fa";

export const Container = styled.div`
  height: 100vh;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--blue);

  section {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    @media (max-width: 499px) {
      flex-direction: column;
      align-items: center;
    }
  }
`;

export const ImageDiv = styled.div`
  flex: 1;
  img {
    width: 40rem;
  }
  @media (max-width: 499px) {
    margin-bottom: 5rem;
  }
`;
