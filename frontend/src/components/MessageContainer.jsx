import React, { useEffect } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import useConversation from "../zustand/useConversation";
import useGetMessages from "../hooks/useGetMessages";
import SideBar from "./Sidebar";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { messages } = useGetMessages();
  console.log("Messages are", messages);
  useEffect(() => {
    // Clean up function
    return () => {
      setSelectedConversation(null);
    };
  }, [setSelectedConversation]);

  return (
    <div className="w-full min-h-screen flex flex-col overflow-hidden pt-10 ">
      {!selectedConversation ? (
        <SideBar />
      ) : (
        <>
          {/* Header */}
          <div className="flex items-center justify-between bg-gray-300 px-4 py-2 mb-2 overflow-y-auto ">
            <span className="label-text pr-2 text-white">To</span>
            <span className=" text-green-700 font-bold">
              {selectedConversation.username}
            </span>
            <span
              onClick={() => setSelectedConversation(!selectedConversation)}
              className="hover:cursor-pointer"
            >
              Back
            </span>
          </div>
          {/* Messages */}
          <Messages messages={messages} />
          {/* <MessageInput /> */}
          <div className=" w-full">
            <MessageInput />
          </div>
        </>
      )}
    </div>
  );
};

export default MessageContainer;
