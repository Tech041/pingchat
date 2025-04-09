
import useLogout from "../hooks/useLogout";
const LogoutButton = () => {
  const { logout, loading } = useLogout();

  return (
    <div onClick={logout} className="">
      {loading ? <span className="loading loading-spinner"></span> : "Logout"}
    </div>
  );
};

export default LogoutButton;
