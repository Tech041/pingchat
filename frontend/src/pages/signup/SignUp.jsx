import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "../../models/Schema";
import axios from "axios";
import { toast } from "react-toastify";
import { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";

const SignUp = () => {
  const { setLoading, loading, setAuthUser, authUser, navigate, backendUrl } =
    useContext(AppContext);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signUpSchema) });
  const handleSignUp = async (formData) => {
    setLoading(true);
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(
        backendUrl + "/api/auth/signup",
        formData
      );
      if (data.success) {
        reset();
        localStorage.setItem("chat-user", JSON.stringify(data));
        setAuthUser(data);
        toast.success("You have succesfully signed up");
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
    authUser && navigate("/");
  }, [authUser]);
  return (
    <section className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-center text-green-900 py-2">
          Developed by Pharm Nelson
        </h1>

        <h1 className="text-3xl font-semibold text-center text-green-600">
          Sign Up To Pingme App
        </h1>
        <form onSubmit={handleSubmit(handleSignUp)} className="">
          <div className="">
            <label htmlFor="fullName" className="label p-2">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              {...register("fullName")}
              id="fullName"
              className="w-full input input-bordered h-10"
              type="text"
              placeholder="Enter your full name..."
            />
          </div>
          {errors.fullName && (
            <p className="text-red-600">{errors.fullName.message}</p>
          )}{" "}
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
            <label htmlFor="password" className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <span className="">
              <input
                {...register("password")}
                id="password"
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
            <label htmlFor="confirmPassword" className="label">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <span className="">
              <input
                {...register("confirmPassword")}
                id="confirmPassword"
                type="password"
                className="w-full input input-bordered h-10"
                placeholder="Confirm Password"
              />
            </span>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-600">{errors.confirmPassword.message}</p>
          )}
          {/* Gender checkbox here */}
          <div className="flex pt-2">
            <div className="form-control pr-2">
              <label htmlFor="" className={`label cursor-pointer gap-2 `}>
                <span className="label-text">Male</span>
                <input
                  {...register("gender")}
                  value={"male"}
                  type="radio"
                  className="radio border-slate-900"
                />
              </label>
            </div>
            <div className="form-control">
              <label htmlFor="" className={`label cursor-pointer gap-2 `}>
                <span className="label-text">Female</span>
                <input
                  {...register("gender")}
                  value={"female"}
                  type="radio"
                  className="radio border-slate-900"
                />
              </label>
            </div>
          </div>
          {errors.gender && (
            <p className="text-red-600">{errors.gender.message}</p>
          )}
          {/* File upload */}
          {/* <div className="form-control pt-5">
            <label htmlFor="" className={`label cursor-pointer gap-2 `}>
              <span className="label-text">Photo</span>
              <input
                {...register("profilePic")}
                type="file"
                name="profilePic"
                className=" border-slate-900"
              />
            </label>
          </div> */}
          <div className="">
            <Link
              to={"/login"}
              className="text-sm hover:underline text-blue-600 mt-2 inline-block"
            >
              Already have an account?
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
                "Sign Up"
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
