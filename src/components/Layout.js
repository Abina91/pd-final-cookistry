import React from "react";
import Header from "./Header";
import NavBar from "./NavBar";
import Footer from "./Footer";

const Layout = ({ children}) => {
  return (
    <div>
      <Header/>
      <NavBar/>
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
