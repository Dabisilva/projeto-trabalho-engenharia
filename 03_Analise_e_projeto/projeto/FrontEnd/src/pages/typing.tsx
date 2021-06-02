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
import { GetServerSideProps } from "next";
import { ChallengesProvider } from "../contexts/ChallengeContext";
import { ChallengerProps } from "../Types/ChallengerProps";

export default function Typing(props: ChallengerProps) {
  const [duration, setDuration] = useState(0);
  const [words, setWords] = useState(
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero exercitationem cumque magni esse architecto repellendus, fugiat tempore asperiores voluptate expedita, nulla, eum voluptatem inventore temporibus non minima repudiandae quidem quos."
  );

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
  const [timeTyping, setTimeTyping] = useState(getDuration);

  useEffect(() => {
    if (phase === 2 && endTime && startTime) {
      setDuration(Math.floor((endTime - startTime) / 1000));
      setCurrWordPos([-1, -1]);
    } else {
      setDuration(0);
    }
  }, [phase, startTime, endTime]);

  return (
    <>
      <Head>
        <title>Digitando | move.it</title>
      </Head>
      <ChallengesProvider
        level={props.level}
        currentExperience={props.currentExperience}
        challengesCompleted={props.challengesCompleted}
      >
        <Container>
          <SideBar namePath="home" />
          <Content>
            <ExperienceBar />
            <h1>Teste de digitação</h1>
            <h2>Quantas palavras você consegue digitar por minuto?</h2>

            <TypeContainer>
              <TypeContent
                onKeyDown={(e) => {
                  const key = e.key;
                  if (key === "Escape") {
                    resetTyping();
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
                    {((correctChar / words.length / errorChar) * 100).toFixed(
                      2
                    )}
                    %
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
      </ChallengesProvider>
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
