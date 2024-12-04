import { Navigate, Outlet } from "react-router";

export const LoginProtectedRoutes = () => {
  const isAuth = document.cookie.includes("loggedIn=true");
  if (!isAuth) {
    return <Navigate to="/login?returnTo=shop" />;
  }
  return <Outlet />;
};
