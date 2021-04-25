import { useContextChallengerData } from "../contexts/ChallengeContext";
import { Overlay, Container } from "../styles/components/LevelUpModal.module";

export function LevelUpModal() {
  const { level, closeLevelUpModal } = useContextChallengerData();
  return (
    <Overlay>
      <Container>
        <header>{level}</header>
        <strong>Parabéns</strong>
        <p>Você alcançou um novo level</p>

        <button type="button" onClick={closeLevelUpModal}>
          <img src="/icons/close.svg" alt="Fechar Modal" />
        </button>
      </Container>
    </Overlay>
  );
}
