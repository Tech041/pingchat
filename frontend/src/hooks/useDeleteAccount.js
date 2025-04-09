import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useContext, useState } from "react";

const useDeleteAccount = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser, authUser, backendUrl, navigate } =
    useContext(AppContext);

  //   const navigate = useNavigate();

  const deleteAccount = async () => {
    const userId = authUser.userData.userId;
    setLoading(true);
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + "/api/auth/delete", {
        userId,
      });
      if (data.success) {
        setAuthUser("");
        navigate("/login");
        localStorage.removeItem("chat-user");
        setLoading(false);
        toast.success("Account deleted");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      return;
    }
  };
  return { deleteAccount, loading };
};

export default useDeleteAccount;
