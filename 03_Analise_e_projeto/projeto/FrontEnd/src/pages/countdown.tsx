import { GetServerSideProps } from "next";
import Head from "next/head";
import { ChallengeBox } from "../components/ChallangeBox";
import { CountDown } from "../components/CountDown";
import { ExperienceBar } from "../components/ExperienceBar";
import { SideBar } from "../components/SideBar";
import { CountdownProvider } from "../contexts/CountDownContext";
import {
  Container,
  CountdownContainer,
} from "../styles/pages/Countdown.module";

export default function countdown() {
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
  const { "moveit:user": user } = ctx.req.cookies;

  if (!user) {
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
