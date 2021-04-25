import { useContextChallengerData } from "../contexts/ChallengeContext";
import { CompletedContainer } from "../styles/components/CompleteChallenges.module";

export function CompleteChallenges() {
  const { challengesCompleted } = useContextChallengerData();
  return (
    <CompletedContainer>
      <span>Desafios completos</span>
      <span>{challengesCompleted}</span>
    </CompletedContainer>
  );
}
