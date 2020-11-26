import React,{useState} from 'react';
import { useParams } from 'react-router-dom';
import { createAssignment, isAuthenticated } from '../auth/helper';
import Base from '../core/Base';



export default function Add() {

    const [values, setvalues] = useState({
        note:'',
        name:'',
        question:'',
        error:'',
        success:false

    })

    
    const {note,name, question} = values;
    const params = useParams();
        

        
  const handleChange = name => event=>{
    setvalues({...values, error: false,  [name] : event.target.value})
  }
  const createAssignment = item =>{
      
    return  fetch(`http://localhost:8000/api/users/courses/new-assignment/${params.id}`,
    {method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${isAuthenticated().token}`
    },
    body: JSON.stringify(item)})
    .then(response => {
      console.log(response)
    })
    .catch(err => console.log(err));
  }
const onSubmit=(event)=>{
  event.preventDefault();
 
  createAssignment({note, name, question})
  .then( data=>{
    setvalues({
      ...values,
      coursecode:'',
      coursename:'',
      error:'',
      success: true
    })
  }
  ).catch(err=>console.log("error in creating assignment",err))
    
 
}

    const createform =()=>{
        return(
        <div>
           
          
        
         <div className="row">
         <h1>create course section works</h1>
         <div className="col-md-6 offset-sm-3 text-left">
         <form>
    
         <div className="form-group">
               <label className="text-dark" ><b>Assignment Name</b></label>
               <input
                 className="form-control"
                placeholder="Name"
                 type="text"
                 onChange={handleChange("name")}
                value={name}
               />
               </div>
               <div className="form-group">
               <label className="text-dark"><b>Note</b></label>
               <input
                 className="form-control"
                 placeholder="Note"
                 onChange={handleChange("note")}
                 type="text"
                 value={note}
                
               />
          </div>
          <div className="form-group">
               <label className="text-dark"><b>Question</b></label>
               <input
                 className="form-control"
                 placeholder="post question"
                 onChange={handleChange("question")}
                 type="text"
                value={question}
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
        <Base title={``}>
        {createform()}
        <p className="text-dark text-center">{JSON.stringify(values)}</p>
        </Base>
    )
}
