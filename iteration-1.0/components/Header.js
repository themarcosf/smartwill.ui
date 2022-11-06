//npm modules
import React from "react";
import { Menu } from "semantic-ui-react";
//project module
import { Link } from "../routes";

/*
a React component houses all the different, reusable elements of an application
the Components directory is separate in order to diferentiate from webpages to be shown to the user
*/

const Header = () => {
  return (
    <Menu style={{ marginTop: "16px" }}>
      <Link route="/">
        <a className="item">smartWill</a>
      </Link>
      <Menu.Menu position="right">
      <Menu.Item>
          <i>Versão de Testes</i>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default Header;