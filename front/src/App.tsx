import { useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/utils/Navbar";
import Notification from "./components/utils/Notification";
import AppRouter from "./router/AppRouter";
import {initChat, initSocket} from "./socket/socket.ts";
import { store } from "./store";
import { useAppDispatch } from "./hooks.ts";

const App = (_props: unknown) => {
  const dispatch = useAppDispatch();
  useEffect(() => initSocket(dispatch), [dispatch]);
  useEffect(() => {initChat(dispatch);}, [dispatch]);
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
