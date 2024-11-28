import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import {App} from './App.js';
import store from './store.js';

import 'semantic-ui-css/semantic.min.css'

  ReactDOM.createRoot(document.getElementById('root')).render(
      <Provider store={store} >
        <App />
      </Provider>
  )
