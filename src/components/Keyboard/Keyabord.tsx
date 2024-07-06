import { useWordleContext } from "../../hooks/useWordleContext";
import "./Keyboard.css";

const KEYBOARD = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"],
];

export const Keyabord = () => {
  const { onType } = useWordleContext();

  return (
    <div className="keyboard">
      {KEYBOARD.map((row, index) => (
        <div className="keyboard-row" key={index}>
          {row.map((key) => {
            const handleClick = () =>
              onType({
                key,
              });

            return (
              <div className="keyboard-cell" onClick={handleClick} key={key}>
                {key}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
