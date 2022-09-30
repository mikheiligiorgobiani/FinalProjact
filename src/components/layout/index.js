import React, { Children } from "react";
import Header from "./heaader/Header";
import Navbar from "./navbar/Navbar";


const index = ({ children }) => {
  return (
    <div>
      <Header />
      <Navbar />
      {children}
    </div>
  );
};

export default index;