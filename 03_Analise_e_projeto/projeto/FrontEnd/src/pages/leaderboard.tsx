import { GetServerSideProps } from "next";
import Head from "next/head";
import { SideBar } from "../components/SideBar";
import { api } from "../services/api";
import {
  ProfileContainer,
  Container,
  UserLevelContainer,
  TdProfile,
  SecondDivHead,
  FirstdDivHead,
  DivGrid,
} from "../styles/pages/Leaderboard.module";

type User = {
  id: number;
  nome: string;
  email: string;
  xp: number;
  challenges: number;
  level: number;
};

interface LeaderboardProps {
  leaderBoard: User[];
}

export default function Leadboard({ leaderBoard }: LeaderboardProps) {
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
              {leaderBoard.map((leader, index) => (
                <tr key={leader.id}>
                  <td>{index + 1}</td>
                  <TdProfile>
                    <div>
                      <span>{leader.nome}</span>
                      <UserLevelContainer>
                        <img src="icons/level.svg" alt="Level" />
                        <p>Level {leader.level}</p>
                      </UserLevelContainer>
                    </div>
                  </TdProfile>

                  <DivGrid />
                  <td>
                    <span>{leader.challenges}</span> completados
                  </td>

                  <td>
                    <span>{leader.xp}</span> xp
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Container>
      </ProfileContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { "moveit:user": user } = ctx.req.cookies;

  let leaderBoard: User[];

  const response = await api.get("leaderBoard");

  leaderBoard = response.data;

  if (!user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      leaderBoard,
    },
  };
};
