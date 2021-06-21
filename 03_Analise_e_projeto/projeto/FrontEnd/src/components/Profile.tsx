import { useAuth } from "../contexts/AuthContext";
import { useContextChallengerData } from "../contexts/ChallengeContext";
import { ProfileContainer } from "../styles/components/Profile.module";

export function Profile() {
  const { level } = useContextChallengerData();
  const { user } = useAuth();

  return (
    <ProfileContainer>
      <div>
        <strong>{user?.nome}</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level {level}
        </p>
      </div>
    </ProfileContainer>
  );
}
