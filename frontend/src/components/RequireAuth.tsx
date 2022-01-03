import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { handleFaliureMessage } from "../features/message.slice";
import { RootState } from "../features/store";

function RequireAuth() {
  const { isLogin } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  let location = useLocation();

  useEffect(() => {
    if (!isLogin) {
      dispatch(handleFaliureMessage("Please Login to continue"));
    }
  }, [isLogin]);

  if (!isLogin) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return <Outlet />;
}

export default RequireAuth;
