import { Provider } from "react-redux";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { Display } from "./pages/Display";
import { FormDisplay } from "./pages/FormDisplay";
import { Home } from "./pages/Home";
import store from "./store";

export const App = (_props: unknown) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Menu>
          <Menu.Item name="heropres">
            <NavLink to="/">Home</NavLink>
          </Menu.Item>
          <Menu.Item name="heropres">
            <NavLink to="/display">Display</NavLink>
          </Menu.Item>
          <Menu.Item name="heropres">
            <NavLink to="/form"> Form</NavLink>
          </Menu.Item>
        </Menu>
        <div>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Routes>
            <Route path="/display" element={<Display />} />
            <Route path="/form" element={<FormDisplay />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
};
