import React from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import useDeleteChat from "../hooks/useDeleteChat";

const DeleteChat = () => {
  const { deletechatFuction, loading } = useDeleteChat();
  return (
    <span onClick={deletechatFuction} className=" hover:cursor-pointer">
      {!loading && <RiDeleteBinLine size={15} color="black" />}
    </span>
  );
};

export default DeleteChat;
