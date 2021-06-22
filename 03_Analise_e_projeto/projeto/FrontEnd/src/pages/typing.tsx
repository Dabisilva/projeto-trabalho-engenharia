import Head from "next/head";
import { useEffect, useState } from "react";
import { SideBar } from "../components/SideBar";

import {
  Container,
  Content,
  TypeContainer,
  TypeContent,
  PhraseHelpContent,
} from "../styles/pages/Typing.module";
import useTypingGame from "react-typing-game-hook";
import { ExperienceBar } from "../components/ExperienceBar";
import { useContextChallengerData } from "../contexts/ChallengeContext";
import { GetServerSideProps } from "next";
import { api } from "../services/api";

interface TypingProps{
  typing : {
    description: string;
    amount: number;
  }
}

export default function Typing({typing}: TypingProps) {
  const { startNormalChallenge, completChallengeTyping, resetChallenge } =
    useContextChallengerData();
  const [duration, setDuration] = useState(0);

  const [words, setWords] = useState(typing.description);
  const [challenge, setChallenge] = useState(typing)

  const {
    states: {
      chars,
      charsState,
      phase,
      startTime,
      endTime,
      correctChar,
      errorChar,
    },
    actions: { insertTyping, resetTyping, deleteTyping, getDuration },
  } = useTypingGame(words);
  const [currWordPos, setCurrWordPos] = useState([-1, -1]);

  function start() {
    if (phase === 2 && endTime && startTime) {
      setDuration(Math.floor((endTime - startTime) / 1000));
      setCurrWordPos([-1, -1]);
    } else {
      setDuration(0);
    }
  }

  useEffect(() => {
    start();
  }, [phase, startTime, endTime]);

  useEffect(() => {
    if (phase === 2 && endTime && startTime) {
      let porcentXp = Math.round(
        challenge.amount *
          (Number(((correctChar / words.length / errorChar) * 100).toFixed(2)) /
            100)
      );

      completChallengeTyping(Number(porcentXp));
    }
  }, [phase, startTime, endTime]);

  return (
    <>
      <Head>
        <title>Digitando | move.it</title>
      </Head>
      <Container>
        <SideBar />
        <Content>
          <ExperienceBar />
          <h1>Teste de digitação</h1>
          <h2>Quantas palavras você consegue digitar por minuto?</h2>

          <TypeContainer>
            <TypeContent
              onKeyDown={(e) => {
                startNormalChallenge(challenge);
                const key = e.key;
                if (key === "Escape") {
                  resetTyping();
                  resetChallenge();
                } else if (key === "Backspace") {
                  deleteTyping(false);
                } else if (key.length === 1) {
                  insertTyping(key);
                }
                e.preventDefault();
              }}
              tabIndex={1}
            >
              {chars.split("").map((char, index) => {
                let state = charsState[index];
                let className =
                  state === 0 ? "" : state === 1 ? "right" : "wrong";
                return (
                  <span key={char + index} className={className}>
                    {char}
                  </span>
                );
              })}
            </TypeContent>
          </TypeContainer>
          <PhraseHelpContent>
            {charsState[0] === 0 ? (
              <p>Clique na frase e começe a digitar para começar</p>
            ) : phase === 2 && startTime && endTime ? (
              <>
                <span>
                  Palavras por minuto:{" "}
                  {Math.round(((60 / duration) * correctChar) / 5)}
                </span>
                <span>
                  Precisão:{" "}
                  {((correctChar / words.length / errorChar) * 100).toFixed(2)}%
                </span>
                <span>Duração: {duration}s</span>
              </>
            ) : null}
          </PhraseHelpContent>

          {phase === 2 && startTime && endTime && (
            <button onClick={() => resetTyping()}>Recomeçar</button>
          )}
        </Content>
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { "moveit:user": user } = ctx.req.cookies;

  const response = await api.get("typing")

  const typing = response.data

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
      typing
    },
  };
};
