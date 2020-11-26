
import React, { useState}  from 'react';
import { Redirect } from 'react-router-dom';
import { courses, isAuthenticated } from '../auth/helper';

import Base from '../core/Base';

 
function CreateCourse({history}) {
   
  const [values, setValues] = useState({
    coursecode:'',
    coursename:'',
    error: '',
    allfine:false,
    success:false,
    loading: false
  })

  const {allfine,coursecode, coursename, success, error,loading} = values;

  const handleChange = name => event=>{
    setValues({...values, error: false,  [name] : event.target.value})
  }

   
 const courses = course => {

  return fetch(`http://localhost:8000/api/users/course/createcourse/${isAuthenticated().user._id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${isAuthenticated().token}`
    },
    body: JSON.stringify(course)
  })
    .then(response => {
      if(response.status  === 200){
        
        return setValues({allfine:true})
      }
      console.log(response)
    })
    .catch(err => console.log(err));
 
};

  const onSubmit = (event)=>{
    event.preventDefault();
    setValues({...values, error: false, loading: true});
    courses({coursename, coursecode})
    // if(allfine){
    //        console.log("sdf")
    //       return <Redirect to="/admin/dashboard"/>
    //      }
    .then(data=>{
      console.log("data coiurses",data)
  
      
       /*  setValues({
          ...values,
          coursecode:'',
          coursename:'',
          error:'',
          success: true
        }) */
      

    })
    .catch(err=>console.log("error in creating course",err));

  }


  const createform =()=>{
    return(
    <div>
       
      
    
     <div className="row">
     <h1>create course section works</h1>
     <div className="col-md-6 offset-sm-3 text-left">
     <form>

     <div className="form-group">
           <label className="text-dark">Course Name</label>
           <input
             className="form-control"
             onChange={handleChange("coursename")}
             type="text"
            value={coursename}
           />
           </div>
           <div className="form-group">
           <label className="text-dark">Course Code</label>
           <input
             className="form-control"
             onChange={handleChange("coursecode")}
             type="text"
            value={coursecode}
           />
      </div>
      <button onClick={onSubmit} className="btn btn-success"> submit</button>
         </form>
     </div>
     </div>
    
     </div>
    )
  }

   return (

    <Base description={``}title={<h3>Create course here</h3>}>
    {createform()}
    <p className="text-dark text-center">{JSON.stringify(values)}</p>
    </Base>
   )
 }
 export default  CreateCourse;