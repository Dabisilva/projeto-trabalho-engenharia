import { useState } from "react";
import {
  AccountContainer,
  StepsContent,
  Separetor,
  NextButton,
} from "../styles/pages/CreateAccount.module";

const pages: React.FC = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [birthday, setBirthday] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  return (
    <AccountContainer>
      <form>
        <StepsContent>
          <div></div>
          <Separetor />
          <div />
        </StepsContent>
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
            Idade
            <input
              placeholder="Digite sua idade"
              value={age}
              onChange={(text) => setAge(text.target.value)}
            />
          </label>
          <label>
            Aniversário
            <input
              type="date"
              placeholder="Digite seu aniversário"
              value={birthday}
              onChange={(text) => setBirthday(text.target.value)}
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
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              pattern="[0-9a-fa-F]{4,8}"
              value={password}
              onChange={(text) => setPassword(text.target.value)}
            />
          </label>

          <NextButton>Próximo</NextButton>
        </fieldset>
      </form>
    </AccountContainer>
  );
};

export default pages;
