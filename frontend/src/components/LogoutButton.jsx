import React, { useContext,  } from "react";
import { BiLogOut } from "react-icons/bi";
import { AppContext } from "../context/AppContext";
const LogoutButton = () => {
  const { logout, loading,  } = useContext(AppContext);
 
  return (
    <div onClick={logout} className="mt-auto mb-10 pb-2 flex justify-end">
      {loading ? (
        <span className="loading loading-spinner"></span>
      ) : (
        <BiLogOut className="w-6 h-6 text-red-600 cursor-pointer" />
      )}
    </div>
  );
};

export default LogoutButton;
