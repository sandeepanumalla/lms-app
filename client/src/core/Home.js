import React from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";

export default function Home() {
  console.log("API IS", API);

  return (
    <Base title='LMS App ' description="Welcome to LMS app"  >
      <div className="row">
        
      </div>
    </Base>
  );
}
