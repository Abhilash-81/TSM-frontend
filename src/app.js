import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import appStore from "./utils/appStore";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import Signup from "./components/SignUp";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Body from "./components/Body";
import CreateTask from "./components/NewTask";
import TaskItem from "./components/TaskItem";
import Completed from "./components/Completed";
import Incomplete from "./components/Incomplete";


const App = () => {
  let persistor = persistStore(appStore);
  return (
    <React.StrictMode>
      <Provider store={appStore}>
        <PersistGate persistor={persistor}>
          <Header />
          <Outlet />
          <ToastContainer />
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );
};

const appRouter = (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<Body />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/api/v1/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/api/v1/addNewTask" element={<CreateTask />} />
        <Route path="/api/v1/complete" element={<Completed />} />
        <Route path="/api/v1/incomplete" element={<Incomplete />} />
        <Route path="task/:id" element={<TaskItem />} />
      </Route>
    </Routes>
  </Router>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(appRouter);
