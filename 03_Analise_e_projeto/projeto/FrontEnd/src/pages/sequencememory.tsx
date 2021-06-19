import Head from "next/head";
import { useEffect, useState } from "react";
import { SideBar } from "../components/SideBar";

import {
  Container,
  Content,
  MemoryContainer,
  MemoryContent,
  ButtonsContainer,
  TapButton,
  StartButton,
} from "../styles/pages/SequenceMemory.module";
import { ExperienceBar } from "../components/ExperienceBar";
import { GetServerSideProps } from "next";
import { useContextChallengerData } from "../contexts/ChallengeContext";
import { ChallengerProps } from "../Types/ChallengerProps";

export default function sequencememory(props: ChallengerProps) {
  const { getPropsFromChallenger } = useContextChallengerData();

  const [start, setStart] = useState(false);
  const [level, setLevel] = useState(1);
  const [activeTapButton, setActiveTapButton] = useState("");
  const [activeTapButtonRandom, setActiveTapButtonRandom] = useState("");
  const [randomSequence, setRandomSequence] = useState([
    "6",
    "7",
    "3",
    "5",
    "2",
    "1",
    "2",
    "6",
    "5",
    "9",
  ]);

  useEffect(() => {
    setTimeout(() => {
      setActiveTapButton("");
    }, 200);
  }, [activeTapButton]);

  useEffect(() => {
    getPropsFromChallenger(props);
  }, []);

  async function startSequence() {
    setStart(true);
    if (level === 1) {
      setTimeout(() => {
        setActiveTapButtonRandom(randomSequence[0]);
      }, 500);
      setTimeout(() => {
        setActiveTapButtonRandom("");
      }, 900);
    }
  }

  return (
    <>
      <Head>
        <title>Memória de sequência | move.it</title>
      </Head>

      <Container>
        <SideBar />
        <Content>
          <ExperienceBar />
          <h1>Teste de memória de sequência</h1>
          <h2>Memorize os padrões.</h2>

          <MemoryContainer>
            <MemoryContent>
              <span>Nível: {level}</span>
              {!start && (
                <StartButton onClick={startSequence}>Começar</StartButton>
              )}
              {start && (
                <ButtonsContainer>
                  <TapButton
                    className={
                      activeTapButton === "1" || activeTapButtonRandom === "1"
                        ? "active"
                        : ""
                    }
                    onClick={() => setActiveTapButton("1")}
                  />
                  <TapButton
                    className={
                      activeTapButton === "2" || activeTapButtonRandom === "2"
                        ? "active"
                        : ""
                    }
                    onClick={() => setActiveTapButton("2")}
                  />
                  <TapButton
                    className={
                      activeTapButton === "3" || activeTapButtonRandom === "3"
                        ? "active"
                        : ""
                    }
                    onClick={() => setActiveTapButton("3")}
                  />
                  <TapButton
                    className={
                      activeTapButton === "4" || activeTapButtonRandom === "4"
                        ? "active"
                        : ""
                    }
                    onClick={() => setActiveTapButton("4")}
                  />
                  <TapButton
                    className={
                      activeTapButton === "5" || activeTapButtonRandom === "5"
                        ? "active"
                        : ""
                    }
                    onClick={() => setActiveTapButton("5")}
                  />
                  <TapButton
                    className={
                      activeTapButton === "6" || activeTapButtonRandom === "6"
                        ? "active"
                        : ""
                    }
                    onClick={() => setActiveTapButton("6")}
                  />
                  <TapButton
                    className={
                      activeTapButton === "7" || activeTapButtonRandom === "7"
                        ? "active"
                        : ""
                    }
                    onClick={() => setActiveTapButton("7")}
                  />
                  <TapButton
                    className={
                      activeTapButton === "8" || activeTapButtonRandom === "8"
                        ? "active"
                        : ""
                    }
                    onClick={() => setActiveTapButton("8")}
                  />
                  <TapButton
                    className={
                      activeTapButton === "9" || activeTapButtonRandom === "9"
                        ? "active"
                        : ""
                    }
                    onClick={() => setActiveTapButton("9")}
                  />
                </ButtonsContainer>
              )}
            </MemoryContent>
          </MemoryContainer>
        </Content>
      </Container>
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
