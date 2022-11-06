//npm module
import React from "react";
import { Container } from "semantic-ui-react";
//import "semantic-ui-css/semantic.min.css";
import Head from "next/head";
//React components
import Header from "./Header";
import Footer from "./Footer";

/*
a React component houses all the different, reusable elements of an application
the Components directory is separate in order to diferentiate from webpages to be shown to the user

child/children system: header and footer are fixed *AND* only the content of the page is swapped between views
in that sense, the content is a child of Layout, which in turn is the root-level of the application
*/

const Layout = (props) => {
  return (
    <div>
      <Container>
        <Head>
          <link
            rel="stylesheet"
            href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"
          ></link>
        </Head>
        <Header />
        {props.children}
        <Footer />
      </Container>
    </div>
  );
};
export default Layout;







