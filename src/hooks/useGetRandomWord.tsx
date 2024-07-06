import { useCallback, useEffect, useState } from "react";

export const useGetRandomWord = () => {
  const [randomWord, setRandomWord] = useState<string>("");

  const fetchRandomWords = useCallback(async () => {
    try {
      const response = await fetch(
        "https://random-word.ryanrk.com/api/en/word/random/?maxlength=5&minlength=5"
      );

      const data = (await response.json()) as string[];

      setRandomWord(data[0].toLowerCase());
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    fetchRandomWords();
  }, [fetchRandomWords]);

  return {
    randomWord,
  };
};
