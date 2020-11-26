import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React,{useState, useEffect} from 'react'
import ReactTooltip from 'react-tooltip'
import { api, courses, isAuthenticated } from '../auth/helper'
import Base from '../core/Base'



const  UserDashboard = ({history}) =>{
 const  [values,setvalues] = useState({
    courses:[]
  })

  const {user} = isAuthenticated()
  
  useEffect(() =>{
   api.get(`/${isAuthenticated().user._id}/student/registered`)
    .then(res => {
            console.log("courses dataaa ",res.data)
            setvalues({courses: res.data })
        })
    ;
  },[])
  if(!Array.isArray(values.courses)){
    values.courses = [values.courses]
}

const redirect =(courseid) => {
   history.push(`/${courseid}/assignment`)
}

const onDeregister =(course_id)=>{
  api.post(`/${course_id}/course/deregister/${isAuthenticated().user._id}`)
  .then(res => {
    console.log("success");
    const newCourse = values.courses.filter(element => element._id !== course_id)
    setvalues({courses:newCourse})
  })
}


    return (
        <Base title={`hello ${user.uname}, you are learning...`}>
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
       <span data-tip data-for="deleteTip"   >
       <button onClick={()=>{onDeregister(item._id)}} className="btn btn-danger">Deregister</button>
       </span>
       <ReactTooltip id="deleteTip" place="left" effect="solid">Deregister Course </ReactTooltip>
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

export default UserDashboard