import React from "react";
import SearchInput from "./SearchInput";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import useGetConversations from "../hooks/useGetConversations";
import PingConversation from "./PingConversation";

const SideBar = () => {
  const { loading } = useGetConversations();

  return (
    <div className=" h-screen  w-full  flex flex-col overflow-scroll">
      <div className=" w-full h-full px-4 mb-40 pb-20">
        <SearchInput />
        <div className="divider px-3"></div>
        <PingConversation />
        <div className="divider px-3"></div>
        <Conversations />
        {!loading && <LogoutButton />}
      </div>
    </div>
  );
};

export default SideBar;
