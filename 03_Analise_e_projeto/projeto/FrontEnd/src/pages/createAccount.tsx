import { FormEvent, useState } from "react";
import Router from "next/router";
import {
  AccountContainer,
  NextButton,
} from "../styles/pages/CreateAccount.module";
import { api } from "../services/api";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { FiEyeOff, FiEye } from "react-icons/fi";

export default function createAccount() {
  const { getUserFromResponse } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassoword] = useState(false);
  const [confirmPassword, setconfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassoword] = useState(false);

  function handleSubmitCheck(event: FormEvent) {
    event.preventDefault();

    let regex =
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%*()_+^&}{:;?.])(?:([0-9a-zA-Z!@#$%;*(){}_+^&])){8,}$/;

    if (name.length < 2) {
      toast.error("Digite seu nome completo");
    } else if (password.length < 8) {
      toast.error("Senha deve possuir pelo menos 8 caractéres");
    } else if (password != confirmPassword) {
      toast.error("Confirmação de senha não bate");
    } else if (!regex.test(password)) {
      toast.error(
        "Senha deve possuir pelo menos 1 caractére especial, letra e número"
      );
    } else {
      create();
    }
  }

  function removeSpaces(value: string) {
    let str = value.replace(/\s/g, "");
    let string = str.toLowerCase();
    return string;
  }

  async function create() {
    let form = {
      nome: name,
      email: removeSpaces(email),
      senha: password,
    };
    await api
      .post("create", form)
      .then((response) => {
        toast.success("Usuário criado com sucesso", {
          position: "top-center",
        });
        getUserFromResponse(response.data, null);
      })
      .catch((err) => {
        let message = err.response.data.message;
        toast.error(message);
      });
  }

  return (
    <AccountContainer>
      <form onSubmit={handleSubmitCheck}>
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
              type={showPassword ? "text" : "password"}
              placeholder="Digite sua senha"
              value={password}
              onChange={(text) => setPassword(text.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassoword(!showPassword)}
            >
              {showPassword ? <FiEye /> : <FiEyeOff />}
            </button>
          </label>

          <label>
            Confirmar senha
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirme sua senha"
              value={confirmPassword}
              onChange={(text) => setconfirmPassword(text.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassoword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FiEye /> : <FiEyeOff />}
            </button>
          </label>

          <NextButton type="submit">Criar conta</NextButton>
        </fieldset>
      </form>
    </AccountContainer>
  );
}
