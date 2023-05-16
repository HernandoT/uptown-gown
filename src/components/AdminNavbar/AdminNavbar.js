import "./AdminNavbar.css";
import logo from "../../utils/assets/logo.png";
import { MultilevelMenu } from "react-multilevel-menu";

const AdminNavbar = () => {
  const list = [
    {
      label: "INBOX",
      items: [
        {
          label: "Chats",
          faIcon: "fa fa-weixin",
        },
      ],
    },
    {
      label: "COLLECTIONS",
      items: [
        {
          label: "Popular Collections",
          faIcon: "fa fa-star-o",
        },
        {
          label: "Filters",
          faIcon: "fa fa-filter",
        },
        {
          label: "All Collections",
          faIcon: "fa fa-book",
        },
      ],
    },
    {
      label: "DATA",
      items: [
        {
          label: "Customer",
          faIcon: "fa fa-users",
        },
        {
          label: "Appointment",
          faIcon: "fa fa-calendar",
        },
        {
          label: "Invoice",
          faIcon: "fa fa-file-text-o",
        },
        {
          label: "Expense",
          faIcon: "fa fa-usd",
        },
        {
          label: "Reports",
          faIcon: "fa fa-bar-chart",
        },
      ],
    },
    {
      label: "SETTINGS",
      items: [
        {
          label: "Change Password",
          faIcon: "fa fa-lock",
        },
        {
          label: "Log Out",
          faIcon: "fa fa-sign-out",
        },
      ],
    },
  ];

  const selectedItem = (event) => {
    console.log(event);
  };

  const config = {
    paddingAtStart: true,
    classname: "my-custom-class",
    fontColor: "grey",
    selectedListFontColor: "black",
    highlightOnSelect: true,
  };

  return (
    <div className="admin-navbar">
      <img src={logo} alt="logo" className="icon" />
      <div className="main-menu">
        <MultilevelMenu
          list={list}
          configuration={config}
          selectedListItem={selectedItem}
          selectedLabel={selectedItem}
        />
      </div>
    </div>
  );
};

export default AdminNavbar;
