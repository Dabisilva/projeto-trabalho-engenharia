import Head from "next/head";
import { LoginForm } from "../components/LoginForm";
import { Container, ImageDiv } from "../styles/pages/Login.module";

export default function Login() {
  return (
    <>
      <Container>
        <Head>
          <title>Login | move.it</title>
        </Head>

        <section>
          <ImageDiv>
            <img src="/simbolo.svg" alt="simbolo" />
          </ImageDiv>

          <LoginForm />
        </section>
      </Container>
    </>
  );
}
