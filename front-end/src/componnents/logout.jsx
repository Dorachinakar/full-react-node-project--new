import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logOutUser } from "../context/authContext";
import { useAuth } from "../context/authContext";
function LogOut({ redirect }) {
  const { logOutUser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    logOutUser();
    if (redirect) {
      navigate(redirect);
    }
  }, []);

  return null;
}

export default LogOut;
