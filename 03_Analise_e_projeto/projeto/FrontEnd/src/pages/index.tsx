import { GetServerSideProps } from "next";
import { useSession } from "next-auth/client";
import Head from "next/head";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { LoginForm } from "../components/LoginForm";
import { useAuth } from "../contexts/AuthContext";
import { useContextChallengerData } from "../contexts/ChallengeContext";
import { api } from "../services/api";
import { Container, ImageDiv } from "../styles/pages/Login.module";

export default function Login() {
  const [session] = useSession();

  const { getUserFromResponse } = useAuth();
  const { getDatesFromResponse } = useContextChallengerData();
  async function loginWithGithubOrGoogle() {
    if (session?.user) {
      await api
        .post("login", {
          type: "signIn",
          nome: session.user.name,
          email: session.user.email,
        })
        .then((response) => {
          toast.success("Sucesso", {
            position: "top-center",
          });
          getUserFromResponse(response.data, null);
          getDatesFromResponse({
            challengesCompleted: response.data.challenges,
            currentExperience: response.data.xp,
            level: response.data.level,
          });
        })
        .catch((err) => {
          let message = err.response.data.message;
          toast.error(message);
        });
    }
  }

  useEffect(() => {
    loginWithGithubOrGoogle();
  }, [session]);
  return (
    <>
      <Container>
        <Head>
          <title>Login | move.it</title>
        </Head>

        <ImageDiv>
          <img src="/simbolo.svg" alt="simbolo" />
        </ImageDiv>

        <LoginForm />
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { "moveit:user": user } = ctx.req.cookies;

  if (user) {
    return {
      redirect: {
        destination: "/home",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
