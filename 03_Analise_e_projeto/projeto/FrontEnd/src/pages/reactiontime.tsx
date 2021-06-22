import Head from "next/head";
import { useEffect, useState } from "react";
import { SideBar } from "../components/SideBar";

import {
  Container,
  Content,
  ReactionTimeContainer,
  ReactionTimeStart,
  ReactionTimeContent,
  ReactionClick,
  ReactionFinished,
} from "../styles/pages/ReactionTime.module";
import { ExperienceBar } from "../components/ExperienceBar";
import { BsClockFill } from "react-icons/bs";
import { GetServerSideProps } from "next";

let countdownTimeout: NodeJS.Timeout;

export default function ReactionTime() {
  const [start, setStart] = useState(false);
  const [click, setClick] = useState(false);

  const [hasFinished, setHasFinished] = useState(false);

  const [isActive, setisActive] = useState(false);

  const [time, setTime] = useState<number>();
  const [startDate, setSartDate] = useState<any>();

  function handleStopCountDown() {
    setisActive(false);
    clearTimeout(countdownTimeout);
    setClick(false);

    let finisehd: any = new Date();

    let miliseconds = finisehd - startDate;

    setTime(miliseconds);
    setHasFinished(true);
  }

  function startCountdown() {
    setisActive(true);
    setSartDate(new Date());
  }

  function handleReactionTime() {
    setStart(true);
    setTimeout(() => {
      setStart(false);
      setClick(true);
      startCountdown();
    }, 5000);
  }

  function handleResetAndStart() {
    setHasFinished(false);
    setTime(0);
    handleReactionTime();
  }

  return (
    <>
      <Head>
        <title>Tempo de reação | move.it</title>
      </Head>

      <Container>
        <SideBar />
        <Content>
          <ExperienceBar />
          <h1>Teste de tempo de reação</h1>
          <h2>
            Quando a tela vermelha ficar verde clique na tela o mais rápido que
            puder.
          </h2>
          <ReactionTimeContainer>
            {!start && !hasFinished && !click && (
              <ReactionTimeContent onClick={handleReactionTime}>
                <h2>Clique em qualquer lugar para começar</h2>
              </ReactionTimeContent>
            )}

            {start && (
              <ReactionTimeStart>
                <h1>...</h1>
                <h2>Espere pelo verde</h2>
              </ReactionTimeStart>
            )}
            {click && (
              <ReactionClick onClick={handleStopCountDown}>
                <h1>...</h1>
                <h2>Clique</h2>
              </ReactionClick>
            )}

            {hasFinished && (
              <ReactionFinished onClick={handleResetAndStart}>
                <BsClockFill />
                <h2>{time}ms</h2>
              </ReactionFinished>
            )}
          </ReactionTimeContainer>
        </Content>
      </Container>
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
