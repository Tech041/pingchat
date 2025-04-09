import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import Home from "./pages/home/Home";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import PingWave from "./pages/pingWave/PingWave";


const App = () => {
  return (
    <main className="p-4 min-h-screen w-full flex items-center justify-center">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ping-wave" element={<PingWave />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </main>
  );
};

export default App;
