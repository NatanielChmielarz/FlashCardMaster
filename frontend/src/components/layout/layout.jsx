import React from "react";
import "./layout.scss";
import Sidebar from "./../../components/navbar/navbar";
// import Navbar from "./../../components/navbar/Navbar";
const Home = ({children}) => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">

        {children}
      </div>
    </div>
  );
};
 
export default Home;