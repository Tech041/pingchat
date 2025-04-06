import React, { useContext } from "react";
import { TiMessages } from "react-icons/ti";
import { AppContext } from "../context/AppContext";
const NoChatSelected = () => {
  const { authUser } = useContext(AppContext);
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-900 font-semibold flex flex-col items-center gap-2">
        <p className="">
          Welcome ❤️{" "}
          <span className="text-green-500">{authUser.userData.fullName}</span>
        </p>
        <p className="">Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};

export default NoChatSelected;
