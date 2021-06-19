import { useEffect } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { CompleteChallenges } from "../components/CompleteChallenges";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { SideBar } from "../components/SideBar";
import { useContextChallengerData } from "../contexts/ChallengeContext";
import { Container, ProfileContainer } from "../styles/pages/Profile.module";
import { ChallengerProps } from "../Types/ChallengerProps";

export default function profile(props: ChallengerProps) {
  const { getPropsFromChallenger } = useContextChallengerData();
  useEffect(() => {
    getPropsFromChallenger(props);
  }, []);
  return (
    <>
      <Head>
        <title>Perfil | move.it</title>
      </Head>
      <ProfileContainer>
        <SideBar namePath="profile" />

        <Container>
          <ExperienceBar />
          <section>
            <Profile />

            <CompleteChallenges />
          </section>
        </Container>
      </ProfileContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challengesCompleted } = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
    },
  };
};
