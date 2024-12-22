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
import WaitingPage from "../pages/WaitingPage";
import CardSelection from "../components/game/CardSelection";
import BoardGame from "../components/game/BoardGame";

const AppRouter = (_props: unknown) => {
  return (
    <Routes>
      <Route element={<LoginProtectedRoutes />}>
        <Route path="/shop" element={<ShopDisplay />} />
        <Route path="/shop/:id?" element={<ShopPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/game">
          <Route path="waiting" element={<WaitingPage />} />
          <Route path="selection" element={<CardSelection />} />
          <Route
            path="playing"
            element={
              <BoardGame opponentId={0} opponentCards={[1, 2, 3, 4, 5]} />
            }
          />
          <Route path="gameOver" element={<div>Game Over</div>} />
        </Route>
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
