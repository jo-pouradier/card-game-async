import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Navbar } from "./components/utils/Navbar";
import { AppRouter } from "./router/AppRouter";
import { store } from "./store";

export const App = (_props: unknown) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <AppRouter />
      </BrowserRouter>
    </Provider>
  );
};
