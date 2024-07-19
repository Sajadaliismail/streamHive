import "bootstrap/dist/css/bootstrap.min.css";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import Context from "./Contexts/SearchContexts";
import InputContext from "./Contexts/SearchInputContext";
import {Provider} from 'react-redux'
import store from "./store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
      <InputContext>
    <Context>
      <Provider store={store}>
        <App />
      </Provider>
    </Context>
      </InputContext>
  </BrowserRouter>
);
