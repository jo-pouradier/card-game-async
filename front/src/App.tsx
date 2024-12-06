import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/utils/Navbar";
import AppRouter from "./router/AppRouter";
import { store } from "./store";
import Notification from "./components/utils/Notification";
import { useEffect } from 'react';
import { io } from 'socket.io-client';

const App = (_props: unknown) => {
    useEffect(() => {
        // Connecter au serveur Socket.IO
        const socket = io('http://localhost:8080');

        // Écouter une notification
        socket.on('notification', (message) => {
            console.log('Notification reçue :', message);
        });


        // Exemple d'envoi d'un événement
        socket.emit('connected', 'test');

        // Nettoyage à la déconnexion
        return () => {
            socket.disconnect();
        };
    }, []);
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
