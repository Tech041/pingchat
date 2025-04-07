import { createContext, useContext, useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import io from "socket.io-client";

export const SocketContext = createContext();
export const useSocketContext = () => {
  return useContext(SocketContext);
};
export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { authUser, backendUrl } = useContext(AppContext);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    if (authUser) {
      const socket = io(backendUrl, {
        query: {
          userId: authUser.userData.userId,
        },
        withCredentials: true,
      });
      setSocket(socket);
      //   socket.on is used for listening for events on both client and server side

      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });
      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  // Logging out for debug

  useEffect(() => {
    if (authUser) {
      const socket = io(backendUrl, {
        query: { userId: authUser.userData.userId },
        withCredentials: true,
      });
      setSocket(socket);

      socket.on("connect", () => {
        console.log("Socket connected:", socket.id);
      });

      socket.on("getOnlineUsers", (users) => {
        console.log("Online users from server:", users);
        setOnlineUsers(users);
      });

      socket.on("connect_error", (err) => {
        console.error("Socket connection error:", err.message);
      });

      return () => socket.close();
    }
  }, [authUser]);
  const value = {
    socket,
    onlineUsers,
    setOnlineUsers,
  };
  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};
