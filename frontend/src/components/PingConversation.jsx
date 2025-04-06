import React from "react";
import { assets } from "../assets/assets";

const Conversation = () => {
  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-gray-200 rounded p-2  py-1 cursor-pointer 
         "bg-gray-200" 
        `}
      >
        <div className={`avatar avatar-online`}>
          <div className="w-12 rounded-full">
            <img src={assets.user_icon} alt="pingWave" />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className=" flex-1 font-bold text-green-950 text-[12px]">
              Am a generative AI
            </p>
            <p className=" flex-1 flex justify-end text-[8px] px-2">
              <span className="">{new Date().getDate()}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="divider my-0 py-0 h-1" />
    </>
  );
};

export default Conversation;
