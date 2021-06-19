import { GetServerSideProps } from "next";
import Head from "next/head";
import { CompleteChallenges } from "../components/CompleteChallenges";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { SideBar } from "../components/SideBar";
import { Container, ProfileContainer } from "../styles/pages/Profile.module";

export default function profile() {
  return (
    <>
      <Head>
        <title>Perfil | move.it</title>
      </Head>
      <ProfileContainer>
        <SideBar namePath="profile" />

        <Container>
          <ExperienceBar />
          <section>
            <Profile />

            <CompleteChallenges />
          </section>
        </Container>
      </ProfileContainer>
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
