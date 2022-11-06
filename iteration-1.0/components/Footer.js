//npm modules
import React from "react";

/*
a React component houses all the different, reusable elements of an application
the Components directory is separate in order to diferentiate from webpages to be shown to the user
*/

const Footer = () => {
  return (
    <footer
      style={{
        color: "#888888",
        borderTop: "1px solid #eeeeee",
        marginTop: "16px",
        padding: "16px 0",
      }}
    >
      <p
        style={{
          textAlign: "right",
        }}
      >
        Criado por 3A1,5M Tech Ltda.
      </p>
      <p
        style={{
          textAlign: "right",
        }}
      >
        Powered by React and Next.js
      </p>
    </footer>
  );
};

export default Footer;