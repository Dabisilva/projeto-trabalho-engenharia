import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import challenges from "../../challenges.json";
import Cookies from "js-cookie";
import { LevelUpModal } from "../components/LevelUpModal";
import { ChallengerProps } from "../Types/ChallengerProps";

interface ChallengesProviderProps {
  children: ReactNode;
}

interface Challenge {
  type: "body" | "eye";
  description: string;
  amount: number;
}

interface ChallengesContextData {
  getPropsFromChallenger: (props: ChallengerProps) => void;
  level: number;
  levelUp: () => void;
  currentExperience: number;
  challengesCompleted: number;
  startNewChallenge: () => void;
  startNormalChallenge: () => void;
  resetChallenge: () => void;
  completChallenge: () => void;
  completChallengeNormal: () => void;
  closeLevelUpModal: () => void;
  activeChallenge: Challenge;
  experienceToNextLevel: number;
  isLevelUpModalOpen: boolean;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }: ChallengesProviderProps) {
  const [level, setLevel] = useState<number>();
  const [currentExperience, setCurrentExperience] = useState<number>();
  const [challengesCompleted, setChallengesCompleted] = useState<number>();
  const [activeChallenge, setActiveChallenge] = useState(null);

  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  function getPropsFromChallenger(props: ChallengerProps) {
    setLevel(props.level);
    setCurrentExperience(props.currentExperience);
    setChallengesCompleted(props.challengesCompleted);
  }

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    Cookies.set("level", String(level));
    Cookies.set("currentExperience", String(currentExperience));
    Cookies.set("challengesCompleted", String(challengesCompleted));
  }, [level, currentExperience, challengesCompleted]);

  function levelUp() {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);
  }

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);

    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);

    new Audio("/notification.mp3").play();

    if (Notification.permission === "granted") {
      new Notification("Novo desafio 🚀", {
        body: `Valendo ${challenge.amount}xp!`,
      });
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completChallenge() {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;
    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setChallengesCompleted(challengesCompleted + 1);
    setActiveChallenge(null);
  }

  function startNormalChallenge() {
    if (activeChallenge) {
      return;
    } else {
      setActiveChallenge("challenge");
    }
  }

  function completChallengeNormal() {
    if (!activeChallenge) {
      return;
    }

    let finalExperience = currentExperience + 80;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setChallengesCompleted(challengesCompleted + 1);
    setActiveChallenge(null);
  }

  return (
    <ChallengesContext.Provider
      value={{
        getPropsFromChallenger,
        level,
        levelUp,
        currentExperience,
        challengesCompleted,
        startNewChallenge,
        startNormalChallenge,
        activeChallenge,
        resetChallenge,
        experienceToNextLevel,
        completChallenge,
        completChallengeNormal,
        isLevelUpModalOpen,
        closeLevelUpModal,
      }}
    >
      {children}
      {isLevelUpModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  );
}

export function useContextChallengerData() {
  const context = useContext(ChallengesContext);

  return context;
}
