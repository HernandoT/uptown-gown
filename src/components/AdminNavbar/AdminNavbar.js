import "./AdminNavbar.css";
import logo from "../../utils/assets/logo.png";
import { MultilevelMenu } from "react-multilevel-menu";
import { Outlet, useNavigate } from "react-router-dom";
import { MantineProvider } from "@mantine/core";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const list = [
    {
      label: "INBOX",
      items: [
        {
          label: "Chats",
          faIcon: "fa fa-weixin",
          onSelected: function () {
            navigate("support");
          },
        },
      ],
    },
    {
      label: "COLLECTIONS",
      items: [
        // {
        //   label: "Popular Collections",
        //   faIcon: "fa fa-star-o",
        //   onSelected: function () {
        //     navigate("popular-collection");
        //   },
        // },
        {
          label: "Filters",
          faIcon: "fa fa-filter",
          onSelected: function () {
            navigate("filters");
          },
        },
        {
          label: "All Collections",
          faIcon: "fa fa-book",
          onSelected: function () {
            navigate("collections");
          },
        },
      ],
    },
    {
      label: "DATA",
      items: [
        {
          label: "Customer",
          faIcon: "fa fa-users",
          onSelected: function () {
            navigate("customer");
          },
        },
        {
          label: "Appointment",
          faIcon: "fa fa-calendar",
          onSelected: function () {
            navigate("appointment");
          },
        },
        {
          label: "Invoice",
          faIcon: "fa fa-file-text-o",
          onSelected: function () {
            navigate("invoice");
          },
        },
        {
          label: "Expense",
          faIcon: "fa fa-usd",
          onSelected: function () {
            navigate("expense");
          },
        },
        {
          label: "Reports",
          faIcon: "fa fa-bar-chart",
          onSelected: function () {
            navigate("reports");
          },
        },
      ],
    },
    {
      label: "SETTINGS",
      items: [
        {
          label: "Change Password",
          faIcon: "fa fa-lock",
          onSelected: function () {
            navigate("change-password");
          },
        },
        {
          label: "Log Out",
          faIcon: "fa fa-sign-out",
          onSelected: function () {
            localStorage.setItem("isAdmin", false);
            localStorage.setItem("idAdmin", "")
            navigate("/login");
          },
        },
      ],
    },
  ];

  const selectedItem = () => {};

  const config = {
    paddingAtStart: true,
    collapseOnSelect: true,
    classname: "my-custom-class",
    fontColor: "#666666",
    selectedListFontColor: "black",
    highlightOnSelect: true,
  };

  return (
    <div>
      <div className="admin-navbar">
        <img src={logo} alt="logo" className="admin-navbar-icon" />
        <div className="main-menu">
          <MantineProvider>
            <MultilevelMenu
              list={list}
              configuration={config}
              selectedListItem={selectedItem}
              // selectedLabel={selectedItem}
            />
          </MantineProvider>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default AdminNavbar;
