import { Navigate, Outlet } from "react-router";

const LoginProtectedRoutes = () => {
  const isAuth = document.cookie.includes("loggedIn=true");
  if (!isAuth) {
    return <Navigate to="/login?returnTo=shop" />;
  }
  return <Outlet />;
};

export default LoginProtectedRoutes;
