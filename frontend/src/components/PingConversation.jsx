import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const PingConversation = () => {
  return (
    <Link to={"/ping-wave"} className=" flex items-center justify-between">
      <img
        src={assets.user_icon}
        alt="pingwave_icon"
        className="w-10 h-10 rounded-full"
      />
      <span className="">Message</span>
      <span className="text-purple-600">PingWave</span>
    </Link>
  );
};

export default PingConversation;
