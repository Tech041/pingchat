import "./SideBar.css";
import { useContext, useState } from "react";
import { assets } from "../../../assets/assets";
import { AppContext } from "../../../context/AppContext";

const Sidebar = () => {
  const { onSent, prevPrompt, setRecentPrompt, newChat } =
    useContext(AppContext);
  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  const [extended, setExtended] = useState(false);
  return (
    <div className="sidebar  hidden md:block ">
      {/* Top div */}
      <div className="top">
        <img
          onClick={() => setExtended((prev) => !prev)}
          src={assets.menu_icon}
          alt=""
          className="menu"
        />
        <div onClick={() => newChat()} className="new-chat">
          <img src={assets.plus_icon} alt="" className="" />
          {extended ? <p className="">New Chat</p> : null}
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompt.map((item, index) => {
              return (
                <div
                  onClick={() => loadPrompt(item)}
                  key={index}
                  className="recent-entry"
                >
                  <img src={assets.message_icon} alt="" className="" />
                  <p className=" text-blue-800">{item.slice(0, 18)}...</p>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
      {/* Bottom div */}
      <div className="bottom mt-40">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" className="" />
          {extended ? <p className="">Help</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" className="" />
          {extended ? <p className="">Activity</p> : null}
        </div>{" "}
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" className="" />
          {extended ? <p className="">Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
