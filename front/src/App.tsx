import {Provider, useDispatch} from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/utils/Navbar";
import AppRouter from "./router/AppRouter";
import { store } from "./store";
import Notification from "./components/utils/Notification";
import { useEffect } from 'react';
import socketConnection from "./socket/socket.ts";

const App = (_props: unknown) => {
    const dispatch = useDispatch();
    useEffect(() =>{
        socketConnection(dispatch)
    },[]);
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
