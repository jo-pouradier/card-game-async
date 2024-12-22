import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "../hooks";
import { selectUser } from "../slices/userSlice";

const LoginProtectedRoutes = () => {
  // const isAuth = document.cookie.includes("loggedIn=true");
  const isAuth = useAppSelector(selectUser) ?? { id: 0 };
  console.debug("isAuth: " + isAuth.id);
  if (isAuth.id === 0) {
    // get path
    const path = "/login?returnTo=" + window.location.pathname.slice(1);
    return <Navigate to={path} />;
  }
  return <Outlet />;
};

export default LoginProtectedRoutes;
