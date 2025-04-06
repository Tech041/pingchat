import { useContext, useState } from "react";
import useConversation from "../zustand/useConversation";
import { toast } from "react-toastify";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const useSentMessage = () => {
  const { backendUrl } = useContext(AppContext);

  const [loading, setLoading] = useState(false);

  const { messages, setMessages, selectedConversation } = useConversation();
  const sendMessage = async (message) => {
    setLoading(true);
    axios.defaults.withCredentials = true;
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/messages/send/${selectedConversation._id}`,
        { message }
      );

      setMessages([...messages, data.newMessage]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, sendMessage };
};

export default useSentMessage;
