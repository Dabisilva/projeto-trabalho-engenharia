import { useContextCountDownData } from "../contexts/CountDownContext";
import {
  CountDownContainer,
  CountDownButton,
  CountDownButtonActive,
} from "../styles/components/CountDown.module";

export function CountDown() {
  const {
    startCountdown,
    seconds,
    resetCountDown,
    minutes,
    isActive,
    hasFinished,
  } = useContextCountDownData();

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, "0").split("");
  const [secondLeft, secondRight] = String(seconds).padStart(2, "0").split("");

  return (
    <div>
      <CountDownContainer>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>

        <span>:</span>

        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </CountDownContainer>

      {hasFinished ? (
        <CountDownButton disabled>
          Ciclo encerrado
          <img src="icons/check_circle.svg" alt="Check" />
        </CountDownButton>
      ) : (
        <>
          {!isActive ? (
            <CountDownButton type="button" onClick={startCountdown}>
              Iniciar um ciclo
              <img src="icons/play_arrow.svg" alt="Play" />
            </CountDownButton>
          ) : (
            <CountDownButtonActive type="button" onClick={resetCountDown}>
              Abandonar ciclo
              <img src="icons/close.svg" alt="Close" />
            </CountDownButtonActive>
          )}
        </>
      )}
    </div>
  );
}
