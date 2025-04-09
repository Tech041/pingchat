import React, { useContext } from "react";
import SearchInput from "./SearchInput";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import useGetConversations from "../hooks/useGetConversations";
import PingConversation from "./PingConversation";
import { AppContext } from "../context/AppContext";
import DeleteButton from "./DeleteAccount";

const SideBar = () => {
  const { loading } = useGetConversations();
  const { authUser } = useContext(AppContext);

  return (
    <div className=" h-screen  w-full  flex flex-col overflow-scroll relative">
      <div className="flex items-center justify-center">
        <div className="py-3">
          <p className="text-center">Hello {authUser.userData.fullName} ❤️</p>
          <p className="text-green-500 text-center">Welcome to Pingme</p>
          <p className="text-center">Select a chat to start messaging</p>
        </div>
      </div>
      <div className=" w-full h-full px-4 mb-40 pb-20">
        <SearchInput />
        <div className="divider px-3"></div>
        <PingConversation />
        <div className="divider px-3"></div>
        <Conversations />
        <div className=" absolute bottom-2 w-full">
          <p className="flex  flex-col gap-3  items-center ">
            <span
              onClick={LogoutButton}
              className="bg-blue-600 px-4 py-1 text-white rounded-lg cursor-pointer"
            >
              {!loading && <LogoutButton/>}
            </span>
            <span className="bg-red-600 px-4 py-1 text-white rounded-lg cursor-pointer">
              {!loading && <DeleteButton/>}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
