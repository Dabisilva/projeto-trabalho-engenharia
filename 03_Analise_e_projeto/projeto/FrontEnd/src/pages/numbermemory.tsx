import Head from "next/head";
import { FormEvent, useEffect, useState } from "react";
import { SideBar } from "../components/SideBar";

import {
  Container,
  Content,
  NumberContainer,
  NumberContent,
  StartButton,
  FormNumber,
  AnswerContent,
} from "../styles/pages/NumberMemory.module";
import { ExperienceBar } from "../components/ExperienceBar";
import { ChallengerProps } from "../Types/ChallengerProps";
import { GetServerSideProps } from "next";
import { useContextChallengerData } from "../contexts/ChallengeContext";

let countdownTimeout: NodeJS.Timeout;

export default function numbermemory(props: ChallengerProps) {
  const { startNormalChallenge, completChallengeNumber } =
    useContextChallengerData();
  const [number, setNumber] = useState("");
  const [inputNumber, setInputNumber] = useState("");
  const [start, setStart] = useState(false);
  const [level, setLevel] = useState(1);
  const [time, setTime] = useState(3);
  const [currentTime, setCurrentTime] = useState(3);
  const [isActive, setisActive] = useState(false);
  const [next, setNext] = useState(false);
  const [answer, setAnswer] = useState(false);

  function genereteRandom(min: number, max: number) {
    const random = Math.floor(Math.random() * (max - min));

    const stringRandom = String(random);

    setNumber(stringRandom);
  }

  function Start(levelUp: number) {
    startNormalChallenge("challenge");
    clearTimeout(countdownTimeout);
    setStart(true);
    setTime(currentTime);
    let max = 10 ** levelUp;

    genereteRandom(10 ** (levelUp - 1), max - 1);

    setisActive(true);
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      setisActive(false);
      setNext(true);
    }
  }, [isActive, time]);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setNext(false);
    setAnswer(true);
  }

  function compareNumberForNext() {
    setAnswer(false);

    if (number == inputNumber) {
      setCurrentTime(currentTime + 1);
      setLevel(level + 1);
      setInputNumber("");
      Start(level + 1);
    } else {
      completChallengeNumber(level * 10);
      setCurrentTime(3);
      setLevel(1);
      setInputNumber("");
      setTime(3);
      Start(1);
    }
  }
  return (
    <>
      <Head>
        <title>Memória numérica | move.it</title>
      </Head>

      <Container>
        <SideBar />
        <Content>
          <ExperienceBar />
          <h1>Teste de memória numérica</h1>
          <h2>
            Uma pessoa pode lembrar de 7 números de uma vez. Você pode fazer
            mais?
          </h2>

          <NumberContainer>
            <NumberContent>
              {!start && (
                <StartButton onClick={() => Start(level)}>começar</StartButton>
              )}

              {start && !next && !answer && (
                <>
                  <span>{number}</span>
                  <time>{time}s</time>
                </>
              )}

              {next && (
                <FormNumber onSubmit={handleSubmit}>
                  <span>Qual foi o número?</span>
                  <input
                    type="text"
                    value={inputNumber}
                    autoFocus
                    pattern="[0-9]*"
                    onChange={(text) => setInputNumber(text.target.value)}
                  />

                  <button type="submit">Enviar</button>
                </FormNumber>
              )}

              {answer && (
                <AnswerContent>
                  <p>Número</p>
                  <span>{number}</span>

                  <p>Sua resposta</p>

                  <span className={number == inputNumber ? "right" : "error"}>
                    {inputNumber}
                  </span>

                  <h2>Nível {level}</h2>

                  <button
                    onClick={compareNumberForNext}
                    className={number == inputNumber ? "" : "error"}
                  >
                    {number == inputNumber ? "Próximo" : "Salvar e tentar novamente"}
                  </button>
                </AnswerContent>
              )}
            </NumberContent>
          </NumberContainer>
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
