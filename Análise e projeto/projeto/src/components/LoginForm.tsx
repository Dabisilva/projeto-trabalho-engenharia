import { useState } from "react";
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
export function LoginForm() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  return (
    <LoginContainer>
      <img src="/icons/logo.svg" alt="simbolo" />
      <span>Bem-vindo</span>
      <p>Faça login para começar</p>

      <LabelContent>
        <InputContent
          autoFocus
          placeholder="Digite seu username"
          value={name}
          onChange={(text) => setName(text.target.value)}
          type="text"
        />

        {/* {name.length === 0 ? (
          <ButtonDisable disabled>
            <ArrowLogo />
          </ButtonDisable>
        ) : (
          <ButtonEneble onClick={{}}>
            <ArrowLogo />
          </ButtonEneble>
        )} */}
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
          <Link href="/profile">
            <ButtonEneble>
              <ArrowLogo />
            </ButtonEneble>
          </Link>
        )}
      </LabelContent>

      <Link href="/createAccount">
        <CreateAccountButton>Criar conta</CreateAccountButton>
      </Link>
    </LoginContainer>
  );
}
