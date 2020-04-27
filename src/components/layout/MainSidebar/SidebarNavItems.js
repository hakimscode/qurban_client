import React from "react";
import { Nav } from "shards-react";

import SidebarNavItem from "./SidebarNavItem";
import { Store } from "../../../flux";

class SidebarNavItems extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      navItems: Store.getSidebarItems()
    };

    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    const sideMenu = [
      {
        title: "User Kelurahan",
        htmlBefore: '<i class="material-icons">person</i>',
        to: "/user-kelurahan"  
      },
      {
        title: "Ganti Password",
        htmlBefore: '<i class="material-icons">vpn_key</i>',
        to: "/ganti-password"
      }
    ];

    if(localStorage.getItem("session-qurban") === 'kecamatan'){
      this.setState({navItems: this.state.navItems.concat(sideMenu)})
    }
    if(localStorage.getItem("session-qurban") === 'kelurahan'){
      this.setState(
        {
          navItems: [...this.state.navItems, 
            {
              title: "Ganti Password",
              htmlBefore: '<i class="material-icons">vpn_key</i>',
              to: "/ganti-password"
            }
          ]
        }
      )
    }

    Store.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    Store.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState({
      ...this.state,
      navItems: Store.getSidebarItems()
    });
  }

  render() {
    const { navItems: items } = this.state;
    return (
      <div className="nav-wrapper">
        <Nav className="nav--no-borders flex-column">
          {items.map((item, idx) => (
            <SidebarNavItem key={idx} item={item} />
          ))}
        </Nav>
      </div>
    )
  }
}

export default SidebarNavItems;
