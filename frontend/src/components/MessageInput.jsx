import React, { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSentMessage from "../hooks/useSentMessage";
import { toast } from "react-toastify";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSentMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!message) return;
      await sendMessage(message);

      setMessage("");
    } catch (error) {
      toast.error(error.setMessage);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="px-4 my-3">
        <div className="w-full relative">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            className="border text-sm rounded-lg block w-full p-2.5 bg-white border-gray-600 text-black"
            placeholder="Type a message ..."
          />
          <button
            type="submit"
            className="absolute inset-y-0 end-0 flex items-center pe-3"
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <BsSend />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
