import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import { App } from "./App.js";
import { store } from "./store.js";

// import "semantic-ui-css/semantic.min.css";

const root = document.getElementById("root");
if (root) {
  ReactDOM.createRoot(root).render(
    <Provider store={store}>
      <App />
    </Provider>
  );
}
