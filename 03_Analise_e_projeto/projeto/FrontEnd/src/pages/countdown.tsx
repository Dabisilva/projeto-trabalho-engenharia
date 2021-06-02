import { useEffect } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { ChallengeBox } from "../components/ChallangeBox";
import { CountDown } from "../components/CountDown";
import { ExperienceBar } from "../components/ExperienceBar";
import { SideBar } from "../components/SideBar";
import { useContextChallengerData } from "../contexts/ChallengeContext";
import { CountdownProvider } from "../contexts/CountDownContext";
import {
  Container,
  CountdownContainer,
} from "../styles/pages/Countdown.module";
import { ChallengerProps } from "../Types/ChallengerProps";

export default function countdown(props: ChallengerProps) {
  const { getPropsFromChallenger } = useContextChallengerData();
  useEffect(() => {
    getPropsFromChallenger(props);
  }, []);
  return (
    <>
      <Head>
        <title>Contador | move.it</title>
      </Head>
      <CountdownContainer>
        <SideBar namePath="home" />

        <Container>
          <ExperienceBar />
          <CountdownProvider>
            <section>
              <CountDown />

              <ChallengeBox />
            </section>
          </CountdownProvider>
        </Container>
      </CountdownContainer>
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
