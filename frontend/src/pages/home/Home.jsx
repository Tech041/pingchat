import React, { useContext, useEffect } from "react";
import MessageContainer from "../../components/MessageContainer";
import { AppContext } from "../../context/AppContext";

const Home = () => {
  const { authUser, navigate } = useContext(AppContext);
  useEffect(() => {
    if (!authUser) {
      navigate("/login");
    }
  }, [authUser]);

  return (
    <section className="flex  justify-center  h-screen w-screen rounded-lg overflow-hidden  bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <div className="w-[98%]  overflow-auto">
        {/* <SideBar /> */}
        <MessageContainer />
      </div>
    </section>
  );
};

export default Home;
