import { useContext, useEffect } from "react";
import Intelligence from "../../components/artificialIntelligence/Intelligence";
import { AppContext } from "../../context/AppContext";

const PingWave = () => {
  const { authUser, navigate } = useContext(AppContext);

  useEffect(() => {
    if (authUser) {
      navigate("/ping-wave");
    } else {
      navigate("/login");
    }
  }, [authUser]);
  return (
    <main className="overflow-scroll">
      <Intelligence />
    </main>
  );
};

export default PingWave;
