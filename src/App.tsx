import { Keyabord } from "./components/Keyboard/Keyabord";
import { Wordle } from "./components/Wordle/Wordle";
import { useWordleContext } from "./hooks/useWordleContext";
import "./App.css";

export const App = () => {
  const { isGameFinished, randomWord } = useWordleContext();

  return (
    <div className="content">
      {isGameFinished && (
        <div>
          <h1>Game Over</h1>
          <p>The word was: {randomWord}</p>
        </div>
      )}
      <Wordle />
      <Keyabord />
    </div>
  );
};
