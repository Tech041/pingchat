import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "react-toastify";
import { loginSchema } from "../../models/Schema";
import { AppContext } from "../../context/AppContext";

const Login = () => {
  const { setLoading, loading, setAuthUser, navigate, authUser, backendUrl } =
    useContext(AppContext);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });
  const handleLogin = async (formData) => {
    setLoading(true);
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(
        backendUrl + "/api/auth/login",
        formData
      );
      if (data.success) {
        reset();
        toast.success("You are logged in");
        localStorage.setItem("chat-user", JSON.stringify(data));
        setAuthUser(data);
        return;
      } else {
        toast.error(data.message);
        return;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (authUser) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [authUser]);
  return (
    <section className="flex flex-col items-center justify-center min-w-96 mx-auto  ">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-center text-green-900 py-2">
          Developed by Pharm Nelson
        </h1>
        <h1 className="text-3xl font-semibold text-center text-green-600">
          Login To Pingme App
        </h1>
        <form onSubmit={handleSubmit(handleLogin)} className="">
          <div className="">
            <label htmlFor="username" className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              {...register("username")}
              id="username"
              className="w-full input input-bordered h-10"
              type="text"
              placeholder="Enter Username..."
            />
          </div>
          {errors.username && (
            <p className="text-red-600">{errors.username.message}</p>
          )}
          <div className="">
            <label htmlFor="input" className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <span className="">
              <input
                {...register("password")}
                id="input"
                type="password"
                className="w-full input input-bordered h-10"
                placeholder="Enter Password"
              />
            </span>
          </div>
          {errors.password && (
            <p className="text-red-600">{errors.password.message}</p>
          )}
          <div className="">
            <Link
              to={"/sign-up"}
              className="text-sm hover:underline text-blue-600 mt-2 inline-block"
            >
              Don't have an account?
            </Link>
          </div>
          <div className="">
            <button
              type="submit"
              className="btn btn-block btn-sm mt-2 bg-green-800 text-white hover:bg-green-500 "
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
