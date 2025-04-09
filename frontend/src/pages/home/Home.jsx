import React, { useContext, useEffect, useState } from "react";
import MessageContainer from "../../components/MessageContainer";
import { AppContext } from "../../context/AppContext";
import NoChatSelected from "../../components/NochatSelected";

const Home = () => {
  const { authUser, navigate } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authUser) {
      navigate("/login");
    }
  }, [authUser]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 50);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <section className="flex  justify-center  h-screen w-screen rounded-lg overflow-hidden  bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <div className="w-[98%]  overflow-auto">
        {/* <SideBar /> */}
        {loading ? (
          <span className="loading loading-spinner"></span>
        ) : (
          <MessageContainer />
        )}
      </div>
    </section>
  );
};

export default Home;
