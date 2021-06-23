import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { FiEyeOff, FiEye } from "react-icons/fi";
import { Container, DivButtons } from "../styles/components/UpdateUser.module";
import { useAuth } from "../contexts/AuthContext";
import { api } from "../services/api";

export function UpdateUser() {
  const { setupdate, user, getUserFromResponse } = useAuth();
  const [name, setName] = useState(user?.nome);
  const [email, setEmail] = useState(user?.email);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassoword] = useState(false);
  const [confirmPassword, setconfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassoword] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    toast.warn("carregando...");
    let form = {
      id: user.id,
      nome: name,
      email: user.email,
      newEmail: email,
    };
    console.log(user);
    await api
      .put("updateUser", form)
      .then((response) => {
        getUserFromResponse(response.data, "update");
        if (!changePassword) {
          toast.success("Alteração realizada com sucesso", {
            position: "top-center",
          });
          setupdate();
        } else {
          handleChangePassword();
        }
      })
      .catch((err) => {
        let message = err.response.data.message;
        toast.error(message);
      });
  }

  async function handleChangePassword() {
    let regex =
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%*()_+^&}{:;?.])(?:([0-9a-zA-Z!@#$%;*(){}_+^&])){8,}$/;

    if (password.length < 8) {
      toast.error("Senha deve possuir pelo menos 8 caractéres");
    } else if (password != confirmPassword) {
      toast.error("Confirmação de senha não bate");
    } else if (!regex.test(password)) {
      toast.error(
        "Senha deve possuir pelo menos 1 caractére especial, letra e número"
      );
    }

    let form = {
      id: user.id,
      novaSenha: password,
    };
    await api
      .put("updatePassword", form)
      .then((response) => {
        toast.success(response.data.message, {
          position: "top-center",
        });
        setupdate();
      })
      .catch((err) => {
        let message = err.response.data.message;
        toast.error(message);
      });
  }
  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Alterar dados</legend>
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

          <button
            type="button"
            onClick={() => setChangePassword(!changePassword)}
            className="changePassword"
          >
            Trocar senha
          </button>

          {changePassword && (
            <>
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
            </>
          )}

          <DivButtons>
            <button type="submit" className="change">
              Alterar
            </button>

            <button type="button" onClick={setupdate} className="cancel">
              Cancelar
            </button>
          </DivButtons>
        </fieldset>
      </form>
    </Container>
  );
}
