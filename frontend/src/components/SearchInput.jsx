import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import useConversation from "../zustand/useConversation";
import useGetConversations from "../hooks/useGetConversations";
import { toast } from "react-toastify";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      toast.error("Search term must be greater than 3 characters");
      return;
    }
    const conversation = conversations.find((c) =>
      c.username.toLowerCase().includes(search.toLowerCase())
    );
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("No user found");
    }
  };
  return (
    <div className="w-full flex justify-center items-center ">
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-center gap-4 w-full "
      >
        <div className="w-full flex items-center justify-between border border-gray-400 rounded-xl">
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            type="text"
            placeholder="Search..."
            className="rounded-full w-[80%] py-2 px-2 outline-none bg-inherit"
          />
          <button
            type="submit"
            className="  text-green-500 w-[20%]  flex justify-end pr-5"
          >
            <IoSearch className="w-5 h-5 outline-none" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchInput;
