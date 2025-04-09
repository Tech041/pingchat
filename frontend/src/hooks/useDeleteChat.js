import { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

const useDeleteChat = () => {
  const { backendUrl, messageId, deleteMessage, setDeleteMessage } =
    useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const deletechatFuction = async () => {
    setLoading(true);
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.delete(
        backendUrl + "/api/messages/delete/" + messageId
      );
      if (data.success) {
        setDeleteMessage(messageId);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, deletechatFuction, deleteMessage };
};

export default useDeleteChat;
