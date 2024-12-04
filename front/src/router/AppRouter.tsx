import { Route, Routes } from "react-router-dom";
import { ShopPage } from "../pages/ShopPage";
import { Display } from "../pages/Display";
import { FormDisplay } from "../pages/FormDisplay";
import { Login } from "../pages/Login";
import { UserRegister } from "../pages/UserRegister";
import { Home } from "../pages/Home";
import { LoginProtectedRoutes } from "./LoginProtectedRoutes";
import { ShopDisplay } from "../components/shop";

export const AppRouter = (_props: unknown) => {
  return (
    <Routes>
      <Route path="/shop" element={<LoginProtectedRoutes />}>
        <Route index element={<ShopDisplay />} />
        <Route path=":id?" element={<ShopPage />} />
      </Route>
      <Route path="/display" element={<Display />} />
      <Route path="/form" element={<FormDisplay />} />
      <Route path="/login" element={<Login />}>
        <Route path="register" element={<UserRegister />} />
      </Route>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};
