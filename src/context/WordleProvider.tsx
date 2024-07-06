import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useGetRandomWord } from "../hooks/useGetRandomWord";

type Wordle = {
  guess: string;
  correctPosition: boolean;
  correctLetter: boolean;
};

type InitialState = {
  wordle: Wordle[][];
  onType: (e: KeyboardEvent | { key: string }) => void;
};

const INITIAL_STATE: InitialState = {
  wordle: Array.from({ length: 6 }, () =>
    Array.from({ length: 5 }, () => ({
      guess: "",
      correctPosition: false,
      correctLetter: false,
    }))
  ),
  onType: () => {},
};

const REGEX = /^[a-zA-Z]$/;

export const WordleContext = createContext(INITIAL_STATE);

export const WordleProvider = ({ children }: { children: ReactNode }) => {
  const [currentRow, setCurrentRow] = useState<number>(0);
  const [currentCol, setCurrentCol] = useState<number>(0);
  const [wordle, setWordle] = useState<Wordle[][]>(INITIAL_STATE.wordle);
  const { randomWord } = useGetRandomWord();

  const isGameWon = useMemo(
    () =>
      currentRow > 0 &&
      wordle[currentRow - 1]?.every((cell) => cell.correctPosition),
    [wordle, currentRow]
  );

  const updateWordle = (rowNumber: number, colNumber: number, guess: string) =>
    setWordle((prevWordle) =>
      prevWordle.map((row, rowIndex) =>
        row.map((cell, colIndex) =>
          rowIndex === rowNumber && colIndex === colNumber
            ? { ...cell, guess: guess.toLowerCase() }
            : cell
        )
      )
    );

  const checkWords = useCallback(() => {
    setWordle((prevWordle) =>
      prevWordle.map((row, rowIndex) =>
        row.map((currentCell, colIndex) => {
          if (rowIndex === currentRow) {
            const numberOfWords = randomWord
              .split("")
              .filter((letter) => letter === currentCell.guess).length;
            const gussedNumberOfWords = row.filter(
              (cell, cellIndex) =>
                cell.guess === currentCell.guess && cellIndex <= colIndex
            ).length;
            const isCorrectLetter =
              randomWord.includes(currentCell.guess) &&
              randomWord[colIndex] !== currentCell.guess &&
              gussedNumberOfWords <= numberOfWords;

            return {
              ...currentCell,
              correctLetter: isCorrectLetter,
              correctPosition: randomWord[colIndex] === currentCell.guess,
            };
          }
          return currentCell;
        })
      )
    );
  }, [currentRow, randomWord]);

  const onType = useCallback(
    (e: KeyboardEvent | { key: string }) => {
      if (isGameWon) {
        return;
      }

      if (e.key.toLowerCase() === "backspace" && currentCol > 0) {
        updateWordle(currentRow, currentCol - 1, "");
        setCurrentCol((prevCol) => prevCol - 1);
        return;
      }

      if (currentCol === 5 && e.key.toLocaleLowerCase() === "enter") {
        checkWords();
        setCurrentRow((prevRow) => prevRow + 1);
        setCurrentCol(0);
        return;
      }

      if (currentCol === 5 || !REGEX.test(e.key)) {
        return;
      }

      updateWordle(currentRow, currentCol, e.key);
      setCurrentCol((prevCol) => prevCol + 1);
    },
    [currentRow, currentCol, checkWords, isGameWon]
  );

  useEffect(() => {
    window.addEventListener("keydown", onType);

    return () => window.removeEventListener("keydown", onType);
  }, [onType]);

  const value = useMemo(
    () => ({
      wordle,
      onType,
    }),
    [wordle, onType]
  );

  return (
    <WordleContext.Provider value={value}>{children}</WordleContext.Provider>
  );
};
