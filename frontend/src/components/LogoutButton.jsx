
import useLogout from "../hooks/useLogout";
const LogoutButton = () => {
  const { logout, loading } = useLogout();

  return (
    <div onClick={logout} className="">
      {loading ? <span className="loading loading-spinner"></span> : 
      <button className="text-[12px] px-3 py-1 bg-blue-500 text-white rounded-lg">Log Out</button>
      }
    </div>
  );
};

export default LogoutButton;
