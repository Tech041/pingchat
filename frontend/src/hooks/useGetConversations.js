import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

const useGetConversations = () => {
  const { backendUrl } = useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const getConversations = async () => {
    setLoading(true);
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.get(backendUrl + "/api/users");
      if (data.success) {
        console.log("All users here", data.users);
        setConversations(data.users);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getConversations();
    console.log("Users are", conversations);
  }, []);

  return { loading, conversations };
};

export default useGetConversations;
