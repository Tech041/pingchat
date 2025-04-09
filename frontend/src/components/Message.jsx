import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import useConversation from "../zustand/useConversation";
import DeleteChat from "./DeleteChat";

const Message = ({ message }) => {
  const { authUser, setMessageId, deleteMessage } = useContext(AppContext);
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser.userData.userId;
  const chatClassName = fromMe ? " chat-end" : "chat-start";
  setMessageId(message._id);
  const profilePic = fromMe
    ? authUser.userData.profilePic
    : selectedConversation?.profilePic;
  const bgColor = fromMe ? "bg-gray-200" : "bg-white";
  const shakeClass = message.shouldShake ? "shake" : "";
  // const formattedTime = extractTime(message.createdAt);
  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={profilePic} />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="">
          {deleteMessage !== message._id && <DeleteChat />}
        </div>
        <div className={`chat-bubble text-black ${shakeClass} ${bgColor}`}>
          {deleteMessage === message._id ? (
            <span className="text-red-500 text-base italic">deleted</span>
          ) : (
            message.message
          )}
        </div>
      </div>

      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {new Date(message.createdAt).toLocaleString()}
      </div>
    </div>
  );
};

export default Message;
