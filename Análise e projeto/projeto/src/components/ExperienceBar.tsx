import { useContextChallengerData } from "../contexts/ChallengeContext";

import {
  ExperienceBarHeader,
  CurrentExperienceSpan,
} from "../styles/components/ExperienceBar.module";

export function ExperienceBar() {
  const {
    currentExperience,
    experienceToNextLevel,
  } = useContextChallengerData();

  const percentToNextlevel =
    Math.round(currentExperience * 100) / experienceToNextLevel;

  return (
    <>
      <ExperienceBarHeader>
        <span>0 xp</span>
        <div>
          <div style={{ width: `${percentToNextlevel}%` }} />

          {currentExperience != 0 && currentExperience != 100 && (
            <CurrentExperienceSpan style={{ left: `${percentToNextlevel}%` }}>
              {currentExperience} xp
            </CurrentExperienceSpan>
          )}
        </div>
        <span>{experienceToNextLevel} xp</span>
      </ExperienceBarHeader>
    </>
  );
}
