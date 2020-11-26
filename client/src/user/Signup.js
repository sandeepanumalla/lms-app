import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Signup = () => {
  const [values, setValues] = useState({
    uname: "",
    fname: "",
    lname: "",
    password: "",
    error: "",
    role: "",
    success: false
  });

  const { uname, fname, password, error, success, lname, role } = values;

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ uname, fname, lname, password, role })
      .then(data => {
         console.log("daataaa",data)
          setValues({
            ...values,
            uname: "",
            fname: "",
            lname: "",
            role: "",
            password: "",
            error: "",
            success: true,
            
          });
        
      })
      .catch(console.log("Error in signup"));
  };

   const onItemClick = event => {
     setValues({...values, error: false, role: event})
    console.log("clicked me!", event)
   }
  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
        <div className="col-md-6 offset-sm-3 text-left">
        <div className="ui large buttons">
        <button onClick={(data)=>{onItemClick("Teacher")}}  className="ui button">Teacher</button>
        <div className="or"></div>
        <button onClick={(data)=>{onItemClick("Student")}} className="ui button">Student</button>
      </div>
      
       
      
        </div>
       
          <form>
            <div className="form-group">
              <label className="text-dark">Username</label>
              <input
                className="form-control"
                onChange={handleChange("uname")}
                type="text"
                value={uname}
              />
            </div>
            <div className="form-group">
              <label className="text-dark">Firstname</label>
              <input
                className="form-control"
                onChange={handleChange("fname")}
                type="text"
                value={fname}
              />
            </div>

            <div className="form-group">
              <label className="text-dark">Lastname</label>
              <input
                onChange={handleChange("lname")}
                className="form-control"
                type="text"
                value={lname}
              />
            </div>
            <div className="form-group">
            <label className="text-dark">Password</label>
            <input
              onChange={handleChange("password")}
              className="form-control"
              type="password"
              value={password}
            />
          </div>
          
            <button onClick={onSubmit} className="btn btn-success btn-block">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New account was created successfully. Please{" "}
            <Link to="/signin">Login Here</Link>
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Base title="Sign up page" description="A page for user to sign up!">
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
      <p className="text-dark text-center">{JSON.stringify(values)}</p>
    </Base>
  );
};

export default Signup;
