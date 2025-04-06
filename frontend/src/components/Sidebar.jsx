import React from "react";
import SearchInput from "./SearchInput";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import useGetConversations from "../hooks/useGetConversations";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const SideBar = () => {
  const { loading } = useGetConversations();

  return (
    <div className=" h-screen  w-full  flex flex-col overflow-scroll">
      <div className=" w-full h-full px-4 mb-40 pb-20">
        <SearchInput />
        <div className="divider px-3"></div>
        <Link
          to={"/ping-wave"}
          className=" flex items-center justify-between"
        >
          <img
            src={assets.user_icon}
            alt="pingwave_icon"
            className="w-10 h-10 rounded-full"
          />
          <span className="text-purple-600">PinWave</span>
        </Link>
        <div className="divider px-3"></div>
        <Conversations />
        {!loading && <LogoutButton />}
      </div>
    </div>
  );
};

export default SideBar;
