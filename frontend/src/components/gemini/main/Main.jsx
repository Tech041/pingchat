import "./Main.css";
import { Link } from "react-router-dom";
import { assets } from "../../../assets/assets";
import { useContext } from "react";
import { AppContext } from "../../../context/AppContext";
import { MdOutlineArrowBack } from "react-icons/md";

// const card = " w-full md:w-auto border-2  px-4 py-2 rounded-2xl"

const Main = () => {
  const { authUser } = useContext(AppContext);
  const userName = authUser.userData.username;

  const {
    onSent,
    recentPrompt,
    showResult,
    onLoading,
    resultData,
    setInput,
    input,
  } = useContext(AppContext);
  const onKeydown = (e) => {
    if (e.key === "Enter") {
      onSent();
    }
  };

  return (
    <div className="main flex-1  pb-5 w-full   min-h-screen ">
      <div className="px-4 mx-auto h-full w-full">
        <div className="mt-2 py-3">
          <Link className="   rounded-full" to={"/"}>
            <MdOutlineArrowBack size={30} color="black" />
          </Link>
        </div>
        <div className="flex items-center justify-center"></div>

        <div className="main-container max-w-[900px] m-auto">
          {!showResult ? (
            <>
              <div className="greet my-[50px] p-5 ">
                <p className="">
                  <span className="text-3xl font-semibold text-blue-700">
                    Hello, {userName}
                  </span>
                </p>
                <p className="py-1">How can I help you?</p>
              </div>
              <div className="cards flex flex-col md:flex-row justify-center items-center gap-4">
                {/* <div className={card}>
                <p className="">Ask me anything concerning health.</p>
                <img src={assets.compass_icon} alt="" className="" />
              </div>
              <div className={card}>
                <p className="">I may not be 100% right always.</p>
                <img src={assets.bulb_icon} alt="" className="" />
              </div> */}
                {/* <div className={card}>
                <p className="">
                  Am gald to have you here,how can I help you?.
                </p>
                <img src={assets.message_icon} alt="" className="" />
              </div> */}
              </div>
            </>
          ) : (
            <div className="result text-gray-600 overflow-y-scroll mt-16">
              <div className="result-title flex items-center gap-4">
                <p className="text-xl font-semibold text-black">
                  {recentPrompt}
                </p>
              </div>
              <div className="result-data flex items-start gap-4">
                {/* <img src={assets.gemini_icon} alt="" /> */}
                {onLoading ? (
                  <div className="loader w-[100%] flex flex-col gap-[10px]">
                    <hr />
                    <hr />
                    <hr />
                  </div>
                ) : (
                  <p
                    dangerouslySetInnerHTML={{ __html: resultData }}
                    className="font-[300] overflow-scroll py-5 text-[17px] leading-[1.8]"
                  ></p>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="main-bottom   w-full mb-5  right-4 px-4 pt-5">
          <div className="search-box flex py-3 px-4 border-2 rounded-3xl    ">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              onKeyDown={onKeydown}
              type="text"
              className=" w-full  focus:outline-none "
              placeholder="Enter a prompt here ..."
            />
            <div className=" flex items-center justify-center px-3 ">
              <img
                onClick={() => onSent()}
                src={assets.send_icon}
                alt=""
                width={20}
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
