import { GetServerSideProps } from "next";
import Head from "next/head";
import { useState } from "react";
import { CompleteChallenges } from "../components/CompleteChallenges";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { SideBar } from "../components/SideBar";
import { useAuth } from "../contexts/AuthContext";
import { Container, ProfileContainer } from "../styles/pages/Profile.module";
import { UpdateUser } from "../components/UpdateUser";

interface ProfileProps {
  token: string | null;
}

export default function profile({ token }: ProfileProps) {
  const { update, setupdate } = useAuth();

  return (
    <>
      <Head>
        <title>Perfil | move.it</title>
      </Head>
      <ProfileContainer>
        <SideBar namePath="profile" />

        <Container>
          {!update ? (
            <>
              <ExperienceBar />
              <div>
                <section>
                  <Profile />

                  <CompleteChallenges />
                </section>

                {!!token === false && (
                  <button onClick={setupdate}>Editar</button>
                )}
              </div>
            </>
          ) : (
            <UpdateUser />
          )}
        </Container>
      </ProfileContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { "moveit:user": user, "next-auth.session-token": token } =
    ctx.req.cookies;

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
      token: !!token === true ? token : null,
    },
  };
};
