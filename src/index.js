import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";

import "./index.css";
import "font-awesome/css/font-awesome.min.css";

import Home from "./pages/Home/Home";
import Rent from "./pages/Rent/Rent";
import CollectionDetail from "./pages/CollectionDetail/CollectionDetail";
import Custom from "./pages/Custom/Custom";
import Appointment from "./pages/Appointment/Appointment";
import About from "./pages/About/About";
import History from "./pages/History/History";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";

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
import { Notifications } from "@mantine/notifications";
import Example from "./pages/Example/example";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./services/query-client";
import AppointmentForm from "./pages/Appointments/AppointmentForm";
import { ModalsProvider } from "@mantine/modals";
import InvoiceForm from "./pages/Invoice/InvoiceForm";
import ConfirmationToken from "./pages/ConfirmationToken/ConfirmationToken";

ReactDOM.render(
  <React.StrictMode>
    <Notifications
      limit={10}
      position="top-right"
      zIndex={999999}
      autoClose={4000}
    />
    <ModalsProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/example" element={<Example />} />
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/rent" element={<Rent />} />
            <Route path="/rent/:id" element={<CollectionDetail />} />
            <Route path="/custom" element={<Custom />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/about" element={<About />} />
            <Route path="/history" element={<History />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/confirmation-token" element={<ConfirmationToken />} />
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
              <Route
                path="popular-collection"
                element={<PopularCollection />}
              />
              <Route path="filters" element={<Filters />} />
              <Route path="collections" element={<Collections />} />
              <Route path="customer" element={<Customer />} />
              <Route path="appointment" element={<Appointments />} />
              <Route path="add-appointment" element={<AppointmentForm />} />
              <Route path="appointment/:id" element={<AppointmentForm />} />
              <Route path="invoice" element={<Invoice />} />
              <Route path="add-invoice" element={<InvoiceForm />} />
              <Route path="invoice/:id" element={<InvoiceForm />} />
              <Route path="expense" element={<Expense />} />
              <Route path="reports" element={<Reports />} />
              <Route path="change-password" element={<ChangePassword />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </ModalsProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
