import "./AdminNavbar.css";
import { NavLink } from "react-router-dom";
import { getPages } from "../../utils/data/getPages";
import logo from "../../utils/assets/logo.png";
import { useEffect, useState } from "react";
import { MultilevelMenu } from "react-multilevel-menu";

const AdminNavbar = () => {
  const [enableMobileMenu, setEnableMenu] = useState(false);

  const list = [
    // {
    //   label: "Home",
    //   faIcon: "fas fa-chevron-down",
    //   // link: "https://www.npmjs.com/package/ng-material-multilevel-menu",
    //   hrefTargetType: "_blank" // _blank|_self|_parent|_top|framename
    // },

    {
      label: "Stay in home",
      faIcon: "fas fa-chevron-down",
      // activeImageIcon: "/ironman.jpg",
      items: [
        {
          label: "Overview",
          faIcon: "fas fa-chevron-down",
          items: [
            {
              label: "Overview Details ",
              button: "Learn more",
              faIcon: "fas fa-allergies",
              // onSelected: function () {
              //   console.log("Item 1.2.2.1");
              // }
            },
            // {
            //   label: "Item 1.2.2",
            //   faIcon: "fas fa-ambulance",
            //   items: [
            //     {
            //       label: "Item 1.2.2.1",
            //       faIcon: "fas fa-anchor"
            //       // onSelected: function () {
            //       //   console.log("Item 1.2.2.1");
            //       // }
            //     }
            //   ]
            // }
          ],
        },
        {
          label: "Corona Virus related",
          faIcon: "fas fa-chevron-down",
          items: [
            {
              label: "Program & information",
              faIcon: "fas fa-chevron-down",
              // onSelected: function () {
              //   console.log("Item 1.2.2.1");
              // }
              items: [
                {
                  label: "Program & information",
                  // faIcon: "fas fa-chevron-down"
                  // onSelected: function () {
                  //   console.log("Item 1.2.2.1");
                  // }
                },
              ],
            },
            {
              label: "Forbearance/Deferral",
              faIcon: "fas fa-chevron-down",
            },
            {
              label: "End of Forbearance Options",
              faIcon: "fas fa-chevron-down",
            },
            {
              label: "State & Local Assistance",
              faIcon: "fas fa-chevron-down",
            },
          ],
        },

        {
          label: "Loan Modification ",
          faIcon: "fas fa-chevron-down",
          // onSelected: function () {
          //   console.log("Item 1.2.2.1");
          // }
        },
      ],
    },
    {
      label: "Leave House",
      faIcon: "fas fa-chevron-down",
      items: [
        {
          label: "House",
          faIcon: "fas fa-chevron-down",
        },
        {
          label: "Persons",
          faIcon: "fas fa-chevron-down",
          // activeFaIcon: "fab fa-accusoft"
        },
      ],
    },
    {
      label: "Document checklist",
      faIcon: "fas fa-chevron-down",
      // activeFaIcon: "fas fa-anchor",
      onSelected: function () {
        console.log("Item 3");
      },
    },
    {
      label: "My Loan status",
      faIcon: "fas fa-chevron-down",
      // activeFaIcon: "fas fa-anchor",
      onSelected: function () {
        console.log("Item 3");
      },
    },
    {
      label: "Support",
      faIcon: "fas fa-chevron-down",
      // activeFaIcon: "fas fa-anchor",
      onSelected: function () {
        console.log("Item 3");
      },
    },
  ];

  const selectedItem = (event) => {
    console.log(event);
  };

  const config = {
    paddingAtStart: true,
    classname: "my-custom-class",
    listBackgroundColor: `white`,
    fontColor: `rgb(8, 54, 71)`,
    backgroundColor: `rgb(208, 241, 239)`,
    selectedListFontColor: `red`,
    highlightOnSelect: true,
    //  useDividers: false
  };

  return (
    <div className="App">
      <img src={logo} alt="logo" className="icon" />
      <div className="main-menu">
        <div className="main-menu-desktop-mode">
          {" "}
          <MultilevelMenu
            list={list}
            configuration={config}
            selectedListItem={selectedItem}
            selectedLabel={selectedItem}
          />
        </div>
        <div className="main-menu-mobile-mode">
          <div className="text-right">
            <i
              className="fas fa-bars menu-bar-icon"
              onClick={() => setEnableMenu(!enableMobileMenu)}
            ></i>
            <div className="mobile-menu-area">
              {enableMobileMenu && (
                <MultilevelMenu
                  list={list}
                  configuration={config}
                  selectedListItem={selectedItem}
                  selectedLabel={selectedItem}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;