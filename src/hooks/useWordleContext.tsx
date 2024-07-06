import { useContext } from "react";
import { WordleContext } from "../context/WordleProvider";

export const useWordleContext = () => useContext(WordleContext);
