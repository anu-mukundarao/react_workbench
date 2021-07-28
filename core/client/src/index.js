import React from "react";
import ReactDOM from "react-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "./index.css";
import App from "./App";
import store from "./store";
import { Provider } from "react-redux";

//import registerServiceWorker from './registerServiceWorker';

ReactDOM.render( 
<Provider store={store}>
<App /> 
</Provider> , document.getElementById('root'));
// registerServiceWorker();