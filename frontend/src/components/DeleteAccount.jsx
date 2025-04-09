import usedDeleteAccount from "../hooks/useDeleteAccount";

const DeleteButton = () => {
  const { deleteAccount, loading } = usedDeleteAccount();

  return (
    <div onClick={deleteAccount} className="">
      {loading ? (
        <span className="loading loading-spinner"></span>
      ) : (
        "Delete Account"
      )}
    </div>
  );
};

export default DeleteButton;
