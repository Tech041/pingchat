import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  //   const navigate = useNavigate();
  const { setAuthUser, backendUrl, navigate } = useContext(AppContext);

  const logout = async () => {
    setLoading(true);
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + "/api/auth/logout");
      if (data.success) {
        setAuthUser("");
        navigate("/login");
        localStorage.removeItem("chat-user");
        setLoading(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      return;
    }
  };
  return { logout, loading };
};

export default useLogout;
