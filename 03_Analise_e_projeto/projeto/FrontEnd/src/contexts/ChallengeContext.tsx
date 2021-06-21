import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import challenges from "../../challenges.json";
import { LevelUpModal } from "../components/LevelUpModal";
import { parseCookies, setCookie } from "nookies";
import { api } from "../services/api";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";

interface ChallengesProviderProps {
  children: ReactNode;
}

interface Challenge {
  type: "body" | "eye";
  description: string;
  amount: number;
}
export type ChallengeResponseProps = {
  level: number;
  challengesCompleted: number;
  currentExperience: number;
};

type ChallengeCompletUpdadate = {
  levelUp: number;
  challenges: number;
  xp: number;
};

interface ChallengesContextData {
  level: number;
  levelUp: () => void;
  currentExperience: number;
  challengesCompleted: number;
  startNewChallenge: () => void;
  startNormalChallenge: () => void;
  resetChallenge: () => void;
  completChallenge: () => void;
  completChallengeTyping: (number: number) => void;
  closeLevelUpModal: () => void;
  activeChallenge: Challenge;
  experienceToNextLevel: number;
  isLevelUpModalOpen: boolean;
  getDatesFromResponse: (date: ChallengeResponseProps) => void;
  completChallengeNumber: (number: number) => void;
  completChallengeReactionTime: (number: number) => void;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }: ChallengesProviderProps) {
  const { user, getUserFromResponse } = useAuth();

  const {
    "moveit:level": cookieLevel,
    "moveit:currentExperience": cookieCurrentExperience,
    "moveit:challengesCompleted": cookieChallengeCompleted,
  } = parseCookies();
  const [level, setLevel] = useState<number>(Number(cookieLevel));
  const [currentExperience, setCurrentExperience] = useState<number>(
    Number(cookieCurrentExperience)
  );
  const [challengesCompleted, setChallengesCompleted] = useState<number>(
    Number(cookieChallengeCompleted)
  );
  const [activeChallenge, setActiveChallenge] = useState(null);

  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  console.log(level);
  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    if (level != NaN) {
      console.log("ok");
      setCookie(undefined, "moveit:level", String(level));
      setCookie(
        undefined,
        "moveit:currentExperience",
        String(currentExperience)
      );
      setCookie(
        undefined,
        "moveit:challengesCompleted",
        String(challengesCompleted)
      );
    }
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

    let form = {
      xp: finalExperience,
      challenges: challengesCompleted + 1,
      levelUp: level + 1,
    };
    updateDatesChallenger(form);
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

  function completChallengeTyping(number: number) {
    if (!activeChallenge) {
      return;
    }

    let finalExperience = currentExperience + number;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setChallengesCompleted(challengesCompleted + 1);
    setActiveChallenge(null);
    let form = {
      xp: finalExperience,
      challenges: challengesCompleted + 1,
      levelUp: level + 1,
    };
    updateDatesChallenger(form);
  }

  function completChallengeNumber(number: number) {
    if (!activeChallenge) {
      return;
    }

    let finalExperience = currentExperience + number;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setChallengesCompleted(challengesCompleted + 1);
    setActiveChallenge(null);
    let form = {
      xp: finalExperience,
      challenges: challengesCompleted + 1,
      levelUp: level + 1,
    };
    updateDatesChallenger(form);
  }

  function completChallengeReactionTime(number: number) {
    if (!activeChallenge) {
      return;
    }

    let finalExperience = currentExperience + number;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setChallengesCompleted(challengesCompleted + 1);
    setActiveChallenge(null);
    let form = {
      xp: finalExperience,
      challenges: challengesCompleted + 1,
      levelUp: level + 1,
    };
    updateDatesChallenger(form);
  }

  function getDatesFromResponse(item: ChallengeResponseProps) {
    setLevel(item.level);
    setCurrentExperience(item.currentExperience);
    setChallengesCompleted(item.challengesCompleted);
  }

  async function updateDatesChallenger({
    xp,
    challenges,
    levelUp,
  }: ChallengeCompletUpdadate) {
    await api
      .put("updateLevelStats", {
        id: user.id,
        xp,
        challenges,
        level: levelUp,
      })
      .then((response) => {
        getUserFromResponse(response.data, "update");
      })
      .catch((err) => {
        let message = err.response.data.message;
        toast.error(message);
      });
  }
  return (
    <ChallengesContext.Provider
      value={{
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
        completChallengeTyping,
        isLevelUpModalOpen,
        closeLevelUpModal,
        getDatesFromResponse,
        completChallengeNumber,
        completChallengeReactionTime,
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
