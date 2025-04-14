import usedDeleteAccount from "../hooks/useDeleteAccount";

const DeleteButton = () => {
  const { deleteAccount, loading } = usedDeleteAccount();

  return (
    <div onClick={deleteAccount} className="">
      {loading ? (
        <span className="loading loading-spinner"></span>
      ) : (
        <button className="text-[12px] px-3 py-1 bg-red-500 text-white rounded-lg">Delete Account</button>
      )}
    </div>
  );
};

export default DeleteButton;
