import { GetServerSideProps } from "next";
import Head from "next/head";
import { SideBar } from "../components/SideBar";
import {
  ProfileContainer,
  Container,
  UserLevelContainer,
  TdProfile,
  SecondDivHead,
  FirstdDivHead,
  DivGrid,
} from "../styles/pages/Leaderboard.module";
export default function Leadboard() {
  return (
    <>
      <Head>
        <title>Leadboard | move.it</title>
      </Head>
      <ProfileContainer>
        <SideBar namePath="leaderboard" />

        <Container>
          <h1>Leaderboard</h1>
          <table>
            <thead>
              <tr>
                <FirstdDivHead>
                  <th>POSIÇÃO</th>
                  <th>USUÁRIO</th>
                </FirstdDivHead>
                <div />
                <SecondDivHead>
                  <th>DESAFIOS</th>
                  <th>EXPERIÊNCIA</th>
                </SecondDivHead>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <TdProfile>
                  <div>
                    <span>Davi Barbosa</span>
                    <UserLevelContainer>
                      <img src="icons/level.svg" alt="Level" />
                      <p>Level 42</p>
                    </UserLevelContainer>
                  </div>
                </TdProfile>

                <DivGrid />
                <td>
                  <span>127</span> completados
                </td>

                <td>
                  <span>127000</span> xp
                </td>
              </tr>
              <tr>
                <td>1</td>
                <TdProfile>
                  <div>
                    <span>Davi Barbosa</span>
                    <UserLevelContainer>
                      <img src="icons/level.svg" alt="Level" />
                      <p>Level 42</p>
                    </UserLevelContainer>
                  </div>
                </TdProfile>

                <DivGrid />
                <td>
                  <span>127</span> completados
                </td>

                <td>
                  <span>127000</span> xp
                </td>
              </tr>
            </tbody>
          </table>
        </Container>
      </ProfileContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { "moveit:username": username } = ctx.req.cookies;

  if (!username) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
