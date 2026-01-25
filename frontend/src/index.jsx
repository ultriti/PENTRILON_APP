// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// import './index.css';


// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App />);

// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import "./index.css";

// import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";
// import { store, persistor } from "./redux/store";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <Provider store={store}>
//     <PersistGate loading={null} persistor={persistor}>
//       <App />
//     </PersistGate>
//   </Provider>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";                              //bhai i made changes in .env, main.py, 

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);