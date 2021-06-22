import Head from "next/head";
import Router from "next/router";
import { SideBar } from "../components/SideBar";
import {
  Container,
  Content,
  CardContainer,
  CardButton,
} from "../styles/pages/Home.module";
import { BsClockFill, BsFillLightningFill } from "react-icons/bs";
import { FaBrain, FaKeyboard } from "react-icons/fa";
import { TiSortNumerically } from "react-icons/ti";
import { GetServerSideProps } from "next";

export default function home() {
  function handleSubmitCountDown() {
    Router.push("/countdown");
  }

  function handleSubmitTyping() {
    Router.push("/typing");
  }

  function handleSubmitReactionTime() {
    Router.push("/reactiontime");
  }

  function handleSubmitSequenceMemory() {
    Router.push("/sequencememory");
  }

  function handleSubmitNumberMemory() {
    Router.push("/numbermemory");
  }

  return (
    <>
      <Head>
        <title>Home | move.it</title>
      </Head>
      <Container>
        <SideBar namePath="home" />

        <Content>
          <CardContainer>
            <CardButton onClick={handleSubmitCountDown}>
              <BsClockFill />
              <span>Contador</span>

              <p>
                Use o contador para te lembrar de sair um pouco do computador.
              </p>
            </CardButton>
            <CardButton onClick={handleSubmitReactionTime}>
              <BsFillLightningFill />
              <span>Tempo de reação</span>

              <p>Teste seus reflexos visuais.</p>
            </CardButton>
            <CardButton onClick={handleSubmitSequenceMemory}>
              <FaBrain />
              <span>Memória de sequência</span>

              <p>
                Lembre-se de um padrão cada vez mais longo de pressionamentos de
                botão.
              </p>
            </CardButton>
            <CardButton onClick={handleSubmitNumberMemory}>
              <TiSortNumerically />
              <span>Memória númerica</span>

              <p>Lembre-se do número mais longo que puder.</p>
            </CardButton>
            <CardButton onClick={handleSubmitTyping}>
              <FaKeyboard />
              <span>Digitando</span>

              <p>Quantas palavras por minuto você consegue digitar?</p>
            </CardButton>
          </CardContainer>
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
