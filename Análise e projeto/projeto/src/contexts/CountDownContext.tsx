import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useContextChallengerData } from "./ChallengeContext";

let countdownTimeout: NodeJS.Timeout;

interface CountdownContextData {
  hasFinished: boolean;
  isActive: boolean;
  minutes: number;
  seconds: number;
  resetCountDown: () => void;
  startCountdown: () => void;
}

interface CountdownProviderProps {
  children: ReactNode;
}

const CountdownContext = createContext({} as CountdownContextData);

export function CountdownProvider({ children }: CountdownProviderProps) {
  const { startNewChallenge } = useContextChallengerData();
  const [hasFinished, setHasFinished] = useState(false);
  const [isActive, setisActive] = useState(false);

  const initialTime = 0.1 * 60;

  const [time, setTime] = useState(initialTime);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  function resetCountDown() {
    setisActive(false);
    clearTimeout(countdownTimeout);
    setTime(initialTime);
    setHasFinished(false);
  }

  function startCountdown() {
    setisActive(true);
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      setisActive(false);
      startNewChallenge();
      setHasFinished(true);
    }
  }, [isActive, time]);
  return (
    <CountdownContext.Provider
      value={{
        hasFinished,
        isActive,
        minutes,
        resetCountDown,
        seconds,
        startCountdown,
      }}
    >
      {children}
    </CountdownContext.Provider>
  );
}

export function useContextCountDownData() {
  const context = useContext(CountdownContext);

  return context;
}
