import React from "react";
import useConversation from "../zustand/useConversation";
import { useSocketContext } from "../context/SocketContext";
import { BsGenderMale } from "react-icons/bs";
import { BsGenderFemale } from "react-icons/bs";

const Conversation = ({ conversation, lastIdx }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();
  const isSelected = selectedConversation?._id === conversation._id;
  const isOnline = onlineUsers.includes(conversation._id);
  return (
    <>
      <div
        onClick={() => setSelectedConversation(conversation)}
        className={`flex gap-2 items-center hover:bg-gray-200 rounded p-2  py-1 cursor-pointer ${
          isSelected ? "bg-gray-200" : ""
        }`}
      >
        <div className={`avatar ${isOnline ? "avatar-online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={conversation.profilePic} alt="profil_pic" />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className=" flex-1 font-bold text-green-950 text-[12px]">
              {conversation.username}
            </p>
            <p className=" flex-1 flex justify-end text-[8px] px-2">
              <span className={`w-[10%]  `}>
                {conversation.gender === "male" ? (
                  <BsGenderMale size={20} color="blue" />
                ) : (
                  <BsGenderFemale size={20} color="pink" />
                )}
              </span>
            </p>
          </div>
        </div>
      </div>
      {!lastIdx && <div className="divider my-0 py-0 h-1" />}{" "}
    </>
  );
};

export default Conversation;
