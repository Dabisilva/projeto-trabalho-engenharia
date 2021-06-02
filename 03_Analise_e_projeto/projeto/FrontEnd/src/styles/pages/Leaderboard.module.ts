import styled from "styled-components";

export const ProfileContainer = styled.div`
  display: grid;

  grid-template-columns: 7rem auto;
  grid-template-areas: "SB BC";

  @media (max-width: 500px) {
    display: flex;
    flex-direction: column;
  }
`;

export const Container = styled.div`
  grid-area: "BC";
  height: 100vh;
  margin: 0 18.75rem;
  padding: 2.5rem 2rem;
  max-width: 60rem;
  display: flex;
  flex-direction: column;
  h1 {
    color: var(--title);
    font-weight: 600;
    font-size: 2.25rem;
  }

  table {
    margin-top: 2.5rem;
    thead {
      tr:first-child {
        display: grid;
        grid-template-rows: 3.125rem;
        grid-template-columns: 10.625rem auto 21.875rem;
        grid-template-areas: "P . E";
      }
      th {
        font-weight: 700;
        font-size: 0.875rem;
        color: var(--text);
      }
    }

    tr {
      display: grid;
      grid-template-rows: 6rem;
      grid-template-columns: 4.75rem 17.5rem auto 14.375rem 10.625rem;
      grid-template-areas: ". . . . .";
      margin-bottom: 0.5rem;
    }

    tbody {
      td:first-child {
        font-size: 1.5rem;
        width: 4.5rem;
        border-radius: 0.3125rem 0 0 0.3125rem;
      }
      td:last-child {
        border-radius: 0 0.3125rem 0.3125rem 0;
      }

      td {
        background: var(--primary);
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        span {
          margin-right: 0.5rem;
          font-size: 1rem;
          color: var(--blue_dark);
        }
        > div {
          span {
            font-weight: 600;
            color: var(--title);
            font-size: 1.25rem;
          }
          margin-left: 1rem;
        }
        > img {
          width: 4rem;
          height: 4rem;
          border-radius: 2.5rem;
        }
      }
    }
  }

  @media (max-width: 1230px) {
    margin: 0 10rem;
    padding: 2rem 1rem;
    max-width: 40rem;
  }
  @media (max-width: 990px) {
    margin: 0 6rem;
    padding: 2rem 1rem;
  }
  @media (max-width: 500px) {
    margin: 1rem;
    padding: 1rem 1rem;
  }
`;

export const DivGrid = styled.div`
  background: var(--primary);
`;

export const UserLevelContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 0.4375rem;
  > img {
    width: 0.875rem;
    height: 1rem;
    margin-right: 0.5625rem;
  }
`;

export const TdProfile = styled.td`
  justify-content: none;
`;

export const FirstdDivHead = styled.div`
  grid-area: "P";
  display: flex;
  justify-content: space-between;
`;
export const SecondDivHead = styled.div`
  grid-area: "E";
  display: flex;
  justify-content: space-between;
  padding-right: 2.5rem;
`;
