import React, { useContext, useEffect, useState } from "react";
import MessageContainer from "../../components/MessageContainer";
import { AppContext } from "../../context/AppContext";
import NoChatSelected from "../../components/NochatSelected";

const Home = () => {
  const { authUser, navigate } = useContext(AppContext);
  const [greeting, setGreeting] = useState(true);

  useEffect(() => {
    if (!authUser) {
      navigate("/login");
    }
  }, [authUser]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setGreeting(false);
    }, 7000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <section className="flex  justify-center  h-screen w-screen rounded-lg overflow-hidden  bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <div className="w-[98%]  overflow-auto">
        {/* <SideBar /> */}
        {greeting ? <NoChatSelected /> : <MessageContainer />}
      </div>
    </section>
  );
};

export default Home;
