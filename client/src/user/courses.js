import React, { Component } from 'react';

import { api, isAuthenticated } from '../auth/helper';
import '../../node_modules/semantic-ui-css/semantic.min.css'
import Base from '../core/Base';


  
class Courses extends Component  {
    state = {
        coursess: [],
        registered:[],

    };
   details =  isAuthenticated().user._id
    componentDidMount() {
     
        api.get('/student/courses').then(res => {
            console.log("courses dataaa ",res.data)
            this.setState({coursess: res.data })
            
        });

        api.get(`/${isAuthenticated().user._id}/student/registered`)
        .then(data => {
            console.log("registered data",data)
            console.log("isAu data", this.details.toString())
            this.setState({registered: data})
        })
        
        

        /* getCourses = (event) =>{
            return fetch(`http://localhost:8000/api/${isAuthenticated().user._id}/student/registered`,
            {
                method:"GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${isAuthenticated().token}`
                  },
                  body: JSON.stringify(event)
            })
            .then(result =>{
                console.log("success ->", result)
            })
            .catch(err => {
                console.log("err",err)
            })
        } */
    }


   

    registerCourse= (courseid)=>{
        return fetch(`http://localhost:8000/api/users/${isAuthenticated().user._id}/course/register/${courseid}`,
        {
            method:"POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${isAuthenticated().token}`
              },
              body: JSON.stringify()
        })
        .then(result =>{
            console.log("success")
            
            
        })
        .catch(err => {
            console.log("err",err)
        })
       
    }

    registerHandler=(courseid)=>{
        return api.post(`/${isAuthenticated().user._id}/course/register/${courseid}`)
        .then((res,err)=>{
            if(err){
              console.log("err",err);
            }
        this.setState()
        
        }
            
      
            )
            .catch((err) =>{
                if(err){
                  console.log("err of catch",err)
                }
              })

    }


   
   render(){
       
    return (
        <Base description={`List of all available courses`} title={`Available courses`}>
        <div className="jumbotron bg-light text-dark text-center">
       
        <div class=" ui three column grid">
        {this.state.coursess.map(title =>
            
            <div key={title._id} class=" column"> 
           <div class="ui segment course">
           <h4 >{title.coursename}</h4>
           <h3 >{title.coursecode}</h3>
           <h5 >{`Instructor: ${title.instructor}`}</h5>
           { (title.students_enrolled.find(element => element  == isAuthenticated().user._id))  ? 
            
            <button onClick={()=>{this.registerHandler(title._id)}} disabled={true} className="btn btn-danger"> Already Registered</button>
            :
             
                <button onClick={()=>{this.registerHandler(title._id)}} className="btn btn-success">Register</button>
            
        }
           
           </div>
           </div>)
           
        }
        
        </div>
        
        
        </div>
        </Base>
        
        
        )
    }
}
export default Courses
/* { title.students_enrolled.find(element => element  == isAuthenticated().user._id)  && (
    <button onClick={()=>{this.registerHandler(title._id)}} className="btn btn-success">Already Registered</button>)
} */
/* {<button onClick={()=>{this.registerHandler(title._id)}} className="btn btn-success"> Registered</button>}
{ title.students_enrolled.find(element => element  == isAuthenticated().user._id)  && (
    <button onClick={()=>{this.registerHandler(title._id)}} className="btn btn-success">Already Registered</button>)
} */