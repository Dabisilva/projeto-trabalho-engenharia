import { FormEvent, useState } from "react";
import Link from "next/link";
import {
  LoginContainer,
  LabelContent,
  InputContent,
  ButtonDisable,
  ButtonEneble,
  ArrowLogo,
  CreateAccountButton,
  DivLogin,
} from "../styles/components/LoginForm.module";
import { signIn as NextSignIn } from "next-auth/client";
import { useAuth } from "../contexts/AuthContext";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export function LoginForm() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    signIn(email, password);
  }
  return (
    <LoginContainer>
      <img src="/icons/logo.svg" alt="simbolo" />
      <span>Bem-vindo</span>
      <p>Faça login para começar</p>

      <form onSubmit={handleSubmit}>
        <LabelContent>
          <InputContent
            autoFocus
            placeholder="Digite seu email"
            value={email}
            onChange={(text) => setEmail(text.target.value)}
            type="text"
          />
        </LabelContent>
        <LabelContent>
          <InputContent
            placeholder="Digite sua senha"
            value={password}
            onChange={(text) => setPassword(text.target.value)}
            type="password"
          />

          {password.length < 8 ? (
            <ButtonDisable disabled>
              <ArrowLogo />
            </ButtonDisable>
          ) : (
            <ButtonEneble type="submit">
              <ArrowLogo />
            </ButtonEneble>
          )}
        </LabelContent>
      </form>
      <DivLogin>
        <div>
          <button onClick={() => NextSignIn("github")}>
            <FaGithub />
          </button>
          <button>
            <FcGoogle onClick={() => NextSignIn("google")} />
          </button>
        </div>
      </DivLogin>
      <Link href="/createAccount">
        <CreateAccountButton>Criar conta</CreateAccountButton>
      </Link>
    </LoginContainer>
  );
}
