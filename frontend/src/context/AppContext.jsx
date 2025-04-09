import { createContext, useState } from "react";
import run from "../config/Gemini";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();
const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const AppContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [messageId, setMessageId] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("chat-user"))
  );
  const navigate = useNavigate();

  // For Gemini
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompt, setPrevPrompt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [onLoading, setOnLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  //   const currency = import.meta.env.VITE_CURRENCY;
  //   const { getToken } = useAuth();
  //   const { user } = useUser();

  // for gemini

  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const newChat = () => {
    setOnLoading(false);
    setShowResult(false);
  };
  const onSent = async (prompt) => {
    setResultData("");
    setOnLoading(true);
    setShowResult(true);
    let response;
    if (prompt !== undefined) {
      response = await run(prompt);
      setRecentPrompt(prompt);
    } else {
      setPrevPrompt((prev) => [...prev, input]);
      setRecentPrompt(input);
      response = await run(input);
    }

    let responseArray = response.split("**");
    let newResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }
    let newResponse2 = newResponse.split("*").join("<br/>");
    let newResponseArray = newResponse2.split(" ");
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      delayPara(i, nextWord + " ");
    }
    setOnLoading(false);
    setInput("");
  };

  // Logging out function

  const value = {
    backendUrl,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    authUser,
    setAuthUser,
    navigate,
    loading,
    setLoading,
    messageId,
    setMessageId,
    deleteMessage,

    setDeleteMessage,

    // For gemini
    prevPrompt,
    setPrevPrompt,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    onLoading,
    resultData,
    input,
    setInput,
    newChat,
    setOnLoading,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
