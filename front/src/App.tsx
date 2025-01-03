import { useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/utils/Navbar";
import Notification from "./components/utils/Notification";
import { useAppDispatch } from "./hooks.ts";
import AppRouter from "./router/AppRouter";
import { initChat, initConnectedUsers, initSocket } from "./socket/socket.ts";
import { store } from "./store";

const App = (_props: unknown) => {
  const dispatch = useAppDispatch();
  useEffect(() => initSocket(dispatch), [dispatch]);
  useEffect(() => initChat(dispatch), [dispatch]);
  useEffect(() => initConnectedUsers(dispatch), [dispatch]);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <AppRouter />
        <Notification />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
