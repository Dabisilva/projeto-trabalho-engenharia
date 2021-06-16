import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { api } from "../../../services/api";

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope: "read:user",
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn(user) {
      const { email, name } = user;
      try {
        await api.post("login", {
          type: "signIn",
          nome: name,
          email,
        });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});
