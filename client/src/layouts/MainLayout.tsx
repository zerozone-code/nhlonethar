import React from "react";
import Navbar from "../comoponents/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../comoponents/Footer";
import ScrollToHash from "../comoponents/ScrollToHash";

const MainLayout = () => {
  return (
    <>
      {/* scroll */}
      <ScrollToHash />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
