import React from "react";
import { API } from "../backend";
import Menu from "./menu";

const Base = ({
  title = "My Title",
  description = "My desription",
  className = "bg-light text-white p-4",
  children
}) => (
  <div>
  <Menu />
    <div className="container-fluid bg-light">
      <div className="jumbotron bg-light text-dark text-center">
        <h2 className="display-4">{title}</h2>
        <p className="lead">{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>
    <footer className="footer bg-light mt-auto py-3">
      <div className="container-fluid bg-success text-white text-center py-3">
        <h4></h4>
        <button className="btn btn-warning btn-lg">About </button>
        <button className="btn btn-warning btn-lg">Contact </button>
      </div>
      <div className="container">
      
      </div>
    </footer>
  </div>
);

export default Base;
