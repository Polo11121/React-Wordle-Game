import { useWordleContext } from "../../hooks/useWordleContext";
import "./Wordle.css";

export const Wordle = () => {
  const { wordle } = useWordleContext();

  return (
    <div className="wordle">
      {wordle?.map((row, rowIndex) => (
        <div className="wordle-row" key={rowIndex}>
          {row.map(({ correctLetter, correctPosition, guess }, guessIndex) => (
            <div
              key={guessIndex}
              className={`wordle-cell${
                correctPosition ? " cell-correct-position" : ""
              }${correctLetter ? " cell-correct-letter" : ""}`}
            >
              {guess}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
