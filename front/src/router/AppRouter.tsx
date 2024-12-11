import { Route, Routes } from "react-router-dom";
import ShopPage from "../pages/ShopPage";
import Display from "../pages/Display";
import FormDisplay from "../pages/FormDisplay";
import Login from "../pages/Login";
import UserRegister from "../pages/UserRegister";
import Home from "../pages/Home";
import LoginProtectedRoutes from "./LoginProtectedRoutes";
import { ShopDisplay } from "../components/shop";
import ChatPage from "../pages/ChatPage";

const AppRouter = (_props: unknown) => {
  return (
    <Routes>
      <Route element={<LoginProtectedRoutes />}>
        <Route path="/shop" element={<ShopDisplay />} />
        <Route path="/shop/:id?" element={<ShopPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Route>
      <Route path="/display" element={<Display />} />
      <Route path="/form" element={<FormDisplay />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<UserRegister />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default AppRouter;
