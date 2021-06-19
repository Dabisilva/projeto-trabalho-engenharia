import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { api } from "../services/api";
import Router from "next/router";
import { signOut as NextSignOut } from "next-auth/client";
import { toast } from "react-toastify";

type User = {
  nome: string;
  email: string;
  level: number;
  challenges: number;
  xp: number;
};

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextData {
  nome: string;
  email: string;
  getUserFromResponse: (user: User) => void;
  signIn: (name: string, senha: string) => void;
  signOut: () => void;
}

export const AuthContext = createContext({} as AuthContextData);

let authChannel: BroadcastChannel;

export function AuthProvider({ children }: AuthProviderProps) {
  const [nome, setName] = useState<string | null>();
  const [email, setEmail] = useState<string | null>();

  useEffect(() => {
    authChannel = new BroadcastChannel("auth");

    authChannel.onmessage = (message) => {
      switch (message.data) {
        case "signOut":
          signOut();
          break;
        default:
          break;
      }
    };
  }, []);

  async function signIn(nome: string, senha: string) {
    await api
      .post("login", {
        type: "normal",
        nome,
        senha,
      })
      .then((response) => {
        setName(response.data);
        setCookie(undefined, "moveit:username", response.data.nome, {
          maxAge: 60 * 60 * 24 * 7, //7 dias
          path: "/",
        });
        setCookie(undefined, "moveit:level", String(response.data.level), {
          maxAge: 60 * 60 * 24 * 7, //7 dias
          path: "/",
        });
        setCookie(
          undefined,
          "moveit:currentExperience",
          String(response.data.xp),
          {
            maxAge: 60 * 60 * 24 * 7, //7 dias
            path: "/",
          }
        );
        setCookie(
          undefined,
          "moveit:challengesCompleted",
          String(response.data.challenges),
          {
            maxAge: 60 * 60 * 24 * 7, //7 dias
            path: "/",
          }
        );
        Router.push("/home");
      })
      .catch((err) => {
        let message = err.response.data.message;
        toast.error(message);
      });
  }

  function signOut() {
    NextSignOut();
    destroyCookie(undefined, "moveit:username");
    destroyCookie(undefined, "moveit:level");
    destroyCookie(undefined, "moveit:currentExperience");
    destroyCookie(undefined, "moveit:challengesCompleted");
    setName(null);

    authChannel.postMessage("signOut");

    Router.push("/");
  }

  function getUserFromResponse(user: User) {
    setName(user.nome);

    setCookie(undefined, "moveit:username", user.nome, {
      maxAge: 60 * 60 * 24 * 7, //7 dias
      path: "/",
    });
    setCookie(undefined, "moveit:email", user.email, {
      maxAge: 60 * 60 * 24 * 7, //7 dias
      path: "/",
    });
    setCookie(undefined, "moveit:level", String(user.level), {
      maxAge: 60 * 60 * 24 * 7, //7 dias
      path: "/",
    });
    setCookie(undefined, "moveit:currentExperience", String(user.xp), {
      maxAge: 60 * 60 * 24 * 7, //7 dias
      path: "/",
    });
    setCookie(
      undefined,
      "moveit:challengesCompleted",
      String(user.challenges),
      {
        maxAge: 60 * 60 * 24 * 7, //7 dias
        path: "/",
      }
    );

    Router.push("/home");
  }

  useEffect(() => {
    const { "moveit:username": username, "moveit:email": useremail } =
      parseCookies();
    setEmail(useremail);
    setName(username);
  }, [nome]);

  return (
    <AuthContext.Provider
      value={{
        nome,
        email,
        getUserFromResponse,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
