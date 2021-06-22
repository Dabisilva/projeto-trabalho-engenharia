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
  id: number;
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
  user: User;
  update: boolean;
  getUserFromResponse: (user: User, update: string) => void;
  signIn: (email: string, senha: string) => void;
  signOut: () => void;
  setupdate: () => void;
}

export const AuthContext = createContext({} as AuthContextData);

let authChannel: BroadcastChannel;

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>();
  const [update, setUpdate] = useState(false);
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

  async function signIn(email: string, senha: string) {
    await api
      .post("login", {
        type: "normal",
        email,
        senha,
      })
      .then((response) => {
        setUser(response.data);

        setCookie(undefined, "moveit:user", JSON.stringify(response.data), {
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
        toast.success("Sucesso", {
          position: "top-center",
        });
        Router.push("/home");
      })
      .catch((err) => {
        let message = err.response.data.message;
        if (message) {
          toast.error(message);
        } else {
          toast.error("Erro ao tentar logar");
        }
      });
  }

  function signOut() {
    NextSignOut();
    destroyCookie(undefined, "moveit:user");
    destroyCookie(undefined, "moveit:level");
    destroyCookie(undefined, "moveit:currentExperience");
    destroyCookie(undefined, "moveit:challengesCompleted");
    setUser(null);

    authChannel.postMessage("signOut");

    Router.push("/");
  }

  function getUserFromResponse(user: User, update: string) {
    setUser(user);

    setCookie(undefined, "moveit:user", JSON.stringify(user), {
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

    if (update) {
      return;
    } else {
      Router.push("/home");
    }
  }

  useEffect(() => {
    const { "moveit:user": user } = parseCookies();
    if (user) {
      const userCookie: User = JSON.parse(user);
      setUser(userCookie);
    }
  }, []);

  function setupdate() {
    setUpdate(!update);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        getUserFromResponse,
        signIn,
        signOut,
        update,
        setupdate,
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
