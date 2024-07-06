import { Keyabord } from "./components/Keyboard/Keyabord";
import { Wordle } from "./components/Wordle/Wordle";
import "./App.css";

export const App = () => (
  <div className="content">
    <Wordle />
    <Keyabord />
  </div>
);
