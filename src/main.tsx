import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import { WordleProvider } from "./context/WordleProvider.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <WordleProvider>
    <App />
  </WordleProvider>
);
