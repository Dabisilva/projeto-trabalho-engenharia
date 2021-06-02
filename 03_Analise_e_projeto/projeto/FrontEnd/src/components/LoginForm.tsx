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
} from "../styles/components/LoginForm.module";
import Router from "next/router";

export function LoginForm() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    Router.push("/home");
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
            placeholder="Digite seu username"
            value={name}
            onChange={(text) => setName(text.target.value)}
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

          {password.length === 0 ? (
            <ButtonDisable disabled>
              <ArrowLogo />
            </ButtonDisable>
          ) : (
            // <Link href="/home">
            <ButtonEneble type="submit">
              <ArrowLogo />
            </ButtonEneble>
            // </Link>
          )}
        </LabelContent>
      </form>

      <Link href="/createAccount">
        <CreateAccountButton>Criar conta</CreateAccountButton>
      </Link>
    </LoginContainer>
  );
}
