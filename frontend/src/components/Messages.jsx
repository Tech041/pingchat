import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessages from "../hooks/useGetMessages";
import MessageSkeletons from "./messageSkeletons";
import useListenMessages from "../hooks/useListenMessages";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  useListenMessages();
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ bahavior: "smooth" });
    }, 100);
  }, [messages]);

  if (loading) {
    return (
      <div className="px-4 flex-1 overflow-scroll">
        {[...Array(3)].map((_, idx) => (
          <MessageSkeletons key={idx} />
        ))}
      </div>
    );
  }

  return (
    <div className="px-1flex-1 overflow-auto">
      {messages.length === 0 ? (
        <p className="text-center">Send a message to start the conversation</p>
      ) : (
        messages.map((message) => (
          <div ref={lastMessageRef} key={message._id} className="">
            <Message message={message} />
          </div>
        ))
      )}
    </div>
  );
};

export default Messages;
