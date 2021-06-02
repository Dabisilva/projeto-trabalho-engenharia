import { FormEvent, useState } from "react";
import Router from "next/router";
import {
  AccountContainer,
  NextButton,
} from "../styles/pages/CreateAccount.module";

const pages: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    Router.push("/home");
  }

  return (
    <AccountContainer>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Criar Conta</legend>
          <label>
            Nome
            <input
              placeholder="Digite seu nome"
              value={name}
              onChange={(text) => setName(text.target.value)}
              autoComplete="name"
              autoFocus
            />
          </label>

          <label>
            Email
            <input
              type="email"
              placeholder="Digite seu email"
              autoComplete="email"
              value={email}
              onChange={(text) => setEmail(text.target.value)}
            />
          </label>
          <label>
            Senha
            <input
              type="password"
              placeholder="Digite sua senha"
              pattern="[0-9a-fa-F]{4,8}"
              value={password}
              onChange={(text) => setPassword(text.target.value)}
            />
          </label>

          <label>
            Confirmar senha
            <input
              type="password"
              placeholder="Confirme sua senha"
              pattern="[0-9a-fa-F]{4,8}"
              value={confirmPassword}
              onChange={(text) => setconfirmPassword(text.target.value)}
            />
          </label>

          <NextButton type="submit">Próximo</NextButton>
        </fieldset>
      </form>
    </AccountContainer>
  );
};

export default pages;
