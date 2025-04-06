import { useState, useEffect, useContext } from "react";
import useConversation from "../zustand/useConversation";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

const useGetMessages = () => {
  const { backendUrl } = useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        axios.defaults.withCredentials = true;
        const { data } = await axios.get(
          ` ${backendUrl}/api/messages/${selectedConversation._id}`
        );
        if (data.success) {
          setMessages(data.messages);
        }
      } catch (error) {
        toast.error(error.messages);
      } finally {
        setLoading(false);
      }
    };
    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessages]);
  return { messages, loading };
};

export default useGetMessages;
