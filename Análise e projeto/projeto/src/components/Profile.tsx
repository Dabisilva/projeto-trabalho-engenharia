import { useContextChallengerData } from "../contexts/ChallengeContext";
import { ProfileContainer } from "../styles/components/Profile.module";

export function Profile() {
  const { level } = useContextChallengerData();
  return (
    <ProfileContainer>
      <img src="https://github.com/Dabisilva.png" alt="Davi Barbosa" />

      <div>
        <strong>Davi Barbosa</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level {level}
        </p>
      </div>
    </ProfileContainer>
  );
}
