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
  AvarageContent,
} from "../styles/pages/ReactionTime.module";
import { ExperienceBar } from "../components/ExperienceBar";
import { BsClockFill } from "react-icons/bs";
import { GetServerSideProps } from "next";
import { useContextChallengerData } from "../contexts/ChallengeContext";

let countdownTimeout: NodeJS.Timeout;

export default function ReactionTime() {
  const {
    completChallengeReactionTime,
    startNormalChallenge,
    activeChallenge,
  } = useContextChallengerData();
  const [start, setStart] = useState(false);
  const [click, setClick] = useState(false);

  const [hasFinished, setHasFinished] = useState(false);

  const [isActive, setisActive] = useState(false);

  const [time, setTime] = useState<number>();
  const [startDate, setSartDate] = useState<any>();

  const [countMsTime, setCountMsTime] = useState<number>(0);
  const [countTypeTime, setCountTypeTime] = useState<number>(1);
  const [avarageNumber, setAvarageNumber] = useState<number>();
  const [avarageBoolean, setAvarageBoolean] = useState(false);
  const [xp, setXp] = useState<number>();

  function handleStopCountDown() {
    setisActive(false);
    clearTimeout(countdownTimeout);
    setClick(false);

    let finisehd: any = new Date();

    let miliseconds = finisehd - startDate;

    setTime(miliseconds);
    setHasFinished(true);
    setCountMsTime(countMsTime + miliseconds);
    setCountTypeTime(countTypeTime + 1);
  }

  function startCountdown() {
    setisActive(true);
    setSartDate(new Date());
  }

  function handleReactionTime() {
    if (!activeChallenge) {
      startNormalChallenge();
    }
    setStart(true);
    setTimeout(() => {
      setStart(false);
      setClick(true);
      startCountdown();
    }, 1000);
  }

  function handleResetAndStart() {
    setHasFinished(false);
    setTime(0);
    handleReactionTime();
  }

  function fineshedAndGetXp() {
    setStart(false);
    setClick(false);
    setHasFinished(false);
    setAvarageBoolean(true);
    setAvarageNumber(Math.round(countMsTime / 5));
    const avarage = Math.round(countMsTime / 5);

    if (avarage <= 200) {
      console.log(avarage, "muito bom");
      completChallengeReactionTime(200);
      setXp(200);
    }
    if (avarage <= 300 && avarage > 200) {
      completChallengeReactionTime(100);
      setXp(100);
    }
    if (avarage <= 400 && avarage > 300) {
      completChallengeReactionTime(50);
      setXp(50);
      console.log(avarage, "ok");
    }
    if (avarage >= 500) {
      completChallengeReactionTime(30);
      setXp(30);
    }
  }

  useEffect(() => {
    if (countTypeTime === 5) {
      fineshedAndGetXp();
    }
  }, [countTypeTime]);

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
            puder. 5 tentativas para ganhar os pontos
          </h2>

          <div>
            <h3>{countTypeTime}</h3>
          </div>
          <ReactionTimeContainer>
            {!start && !hasFinished && !click && !avarageBoolean && (
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

                <h3>clique pra continuar</h3>
              </ReactionFinished>
            )}

            {avarageBoolean && (
              <AvarageContent>
                <h2>Sua média é de {avarageNumber}ms</h2>
                <h2>Você ganhou {xp} de experiência.</h2>
                <button onClick={handleReactionTime}>recomeçar</button>
              </AvarageContent>
            )}
          </ReactionTimeContainer>
        </Content>
      </Container>
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
