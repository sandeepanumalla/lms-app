
import React,{useEffect, useState} from 'react'
import { Redirect } from 'react-router-dom'
import { api, /* courses */ isAuthenticated } from '../auth/helper'
import Base from '../core/Base'
/* import Courses   from './courses'
import CreateCourse from './createCourse' */
import EnrolledCourses from './enrolledCourses'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faCoffee, faTrash } from '@fortawesome/free-solid-svg-icons'
import ReactTooltip from 'react-tooltip'
import { Button,Image, Header, Modal, Segment } from 'semantic-ui-react'


const  AdminDashboard = ({history}) =>{
 
  const [values, setvalues] = useState({
    courses:[],
    modal: false,
    refresh: false

  })


  const onClickDelete = (courseid) =>{
    return api.delete(`/${courseid._id}/delete`)
    .then((success)=>{
      if(success){
        console.log("success",success);
      }
        console.log("success");
        const newCourses = values.courses.filter(m => m._id !== courseid._id)
   /*  console.log("delete",courses) */
    setvalues({courses: newCourses})
       
       
      
    })
    .catch((err) =>{
      if(err){
        console.log("err",err)
      }
    })
    
    
  }
    /* const didRedirect=()=>{
      if(values.refresh){
        return <Redirect to="/" />
      }
     }
   */

  useEffect(() =>{
    api.get(`/courses/enrolled/${isAuthenticated().user._id}`)
    .then(res => {
            console.log("courses dataaa ",res.data)
            setvalues({courses: res.data })
        })
    ;
  },[])
  
  const redirect =(courseid) => {
    history.push(`/${courseid}/assignment`)
  }
  
  
    const {user} = isAuthenticated();

    if(!Array.isArray(values.courses)){
      values.courses = [values.courses]
  }

 /* 
  console.log(values.courses[1]) */
    return (
      
        <Base description={``} title={`hello ${user.uname}, you are teaching...`} >
          <div className="d-flex justify-content-center">
            <button onClick={() => {history.push('/createcourse')}} style={{borderRadius:"10px"}}  
            className=" ui teal button ">Enroll a Course</button>
          </div>
          
          <div>
          <div className="jumbotron bg-light text-dark text-center">
       
          

        <div className=" ui three column grid">
       {
          values.courses.map(item => 
            <div key={item._id} className=" column">
            <div className="eachcourse"> 
          <div  className="ui segment course">
        
          <h4 >{item.coursename}</h4>
          <h2 style={{cursor:"pointer"}} onClick={()=>{redirect(item._id)}} >{item.coursecode}</h2>
         <span data-tip data-for="deleteTip"   onClick={()=>{onClickDelete(item)}}>
         <FontAwesomeIcon icon={faTrash} color="#ff4d4d" size="2x" style={{hover:{color:"black"}}} />
         </span>
         <ReactTooltip id="deleteTip" place="left" effect="solid">Drop Course </ReactTooltip>
         </div>
         </div>
          </div>
          )
       }
   
      
       
           </div>
   
          
   </div>
           
          </div>
         
          
          
        </Base>
        
    )
}

export default AdminDashboard

