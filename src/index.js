import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import "./index.css";
import "font-awesome/css/font-awesome.min.css";

import Home from "./pages/Home/Home";
import Rent from "./pages/Rent/Rent";
import Custom from "./pages/Custom/Custom";
import Appointment from "./pages/Appointment/Appointment";
import About from "./pages/About/About";
import Detail from "./pages/Detail/Detail";
import History from "./pages/History/History";
import Login from "./pages/Login/Login";

import ProtectedRoute from "./components/ProtectedRoute";

import AdminLogin from "./pages/AdminLogin/AdminLogin";
import PopularCollection from "./pages/PopularCollection/PopularCollection";
import SupportAdmin from "../src/SupportAdmin";
import AdminNavbar from "./components/AdminNavbar/AdminNavbar";
import Filters from "./pages/Filters/Filters";
import Collections from "./pages/Collections/Collections";
import Customer from "./pages/Customer/Customer";
import Appointments from "./pages/Appointments/Appointments";
import Invoice from "./pages/Invoice/Invoice";
import Expense from "./pages/Expense/Expense";
import Reports from "./pages/Reports/Reports";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import Profile from "./pages/Profile/Profile";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rent" element={<Rent />} />
        <Route path="/custom" element={<Custom />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/about" element={<About />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/history" element={<History />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminNavbar />
            </ProtectedRoute>
          }
        >
          <Route path="support" element={<SupportAdmin />} />
          <Route path="popular-collection" element={<PopularCollection />} />
          <Route path="filters" element={<Filters />} />
          <Route path="collections" element={<Collections />} />
          <Route path="customer" element={<Customer />} />
          <Route path="appointment" element={<Appointments />} />
          <Route path="invoice" element={<Invoice />} />
          <Route path="expense" element={<Expense />} />
          <Route path="reports" element={<Reports />} />
          <Route path="change-password" element={<ChangePassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
