import React, { Component } from 'react'
import { Item } from 'semantic-ui-react'
import { api, isAuthenticated } from '../auth/helper'
import Base from '../core/Base'



export default class Submissions extends Component {

    state={
        submissions:{},
        solutions:[],
        question:[],
        object_id:[],
        answer:[],
        values:"1",
        error:"",
        ok:"",
        click:false
    }

    
    constructor(props){
        super()
        this.handleChange = this.handleChange.bind(this);

    }
    
    componentDidMount(){
        api.get(`/${isAuthenticated().user._id}/assignment/${this.props.match.params.id}`)
        .then(res =>{
            console.log("da",res.data)
            this.setState({submissions:res.data})
            this.setState({question:res.data.question})
            this.setState({solutions:res.data.solutions})
        })
        .catch(err => {
            console.log("err", err)
        })
    }
    
    
    clickHandler(solution){

        console.log("question is ",solution.solution);
        this.setState({answer:solution.solution})
        this.setState({object_id:solution._id})
        console.log("object_id is ",this.state.object_id);
        this.setState({click:true})
    }

    evaluations=(item)=>{
               console.log("this is meee!",this.state.object_id)
         return  fetch(`http://localhost:8000/api/users/${this.state.object_id}/assignment`,
        {
            method:"POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${isAuthenticated().token}`
              },
              body: JSON.stringify(item)
        })
        .then(result =>{
            console.log("success",result.ok)
            this.setState({ok:result.ok})
            console.log("state",this.state.ok)
            
            
        })
        .catch(err => {
            console.log("err",err)
        })
        
     }
   handleChange=event =>{
      
       this.setState({values: event.target.value})
   }

  
clickk=(event)=>{
    event.preventDefault();
    this.setState({...this.state, error:false})
    const value = this.state.values;
    console.log("value ",value)
    this.evaluations({value}).then(data=>{
        this.setState({ ...this.state,
        solution:"",
        success: true
        })
        
        
      })
      .catch(err =>{
          console.log("errorr,",err)
      })
    console.log("clicked me",this.state.values)
}
    render() {
        if(!Array.isArray(this.state.submissions)){
            this.state.submissions = [this.state.submissions]
        }
      /*   console.log('sta',this.state.submissions)
        console.log('submission',this.state.solutions) */
        
        return (
            <Base  description={``} title={`Assignment Submissions`}>
            <div className="ui grid container" style={{minWidth:"700px"}}>
        <div className="six wide column" >
        
          <div className="ui container" style={{border:"2px solid black",borderRadius:"12px",overflow:"hidden"}}>
          <div style={{display:"flex", justifyContent:"space-around",allignItems:"center"}}>
          <h1 className="text-dark">Submissions</h1>
          </div>
          {
              this.state.solutions.map(item => {
                  return  <div key={item._id} className="ui segment "  > 
                  <div className="d-flex justify-content-center" style={{padding:"17px"}}>
                  <h4 className="text-dark" >from:  {item.student} 
                  </h4>
                  </div>
                  <div className="d-flex justify-content-center" style={{padding:"17px"}}>
                  <button className="ui green button" onClick={()=>{this.clickHandler(item)}} > view</button>
                  </div>
                  {( item.results !== null && item.results >= 0)?
                      <div className="d-flex justify-content-center" style={{padding:"17px"}}>
                                  <p className="text-dark"> Grade Assigned:{JSON.stringify(item.results)} </p>
                      </div>
                      :
                      <p></p>
                    
                    }
                  
                  </div>
              }
                )
          }
    
    </div>
    </div>
    { this.state.click ?
        <div className="ten wide column">
    <div className="ui container"  style={{border:"2px solid black",borderRadius:"12px",overflow:"hidden"}}>
    
        <h1 className="text-dark">Evaluation</h1>
        <div className="ui segment "  > 
                  <div className="d-flex justify-content-center" style={{padding:"17px"}}>
                  <h3 className="text-dark" >Question:  {this.state.question} 
                  </h3>
                  </div>
                  <div className="d-flex justify-content-center" style={{padding:"13px"}}>
                  <h4 className="text-dark" >Answer:  {this.state.answer} 
                  </h4>
                  </div>
                  <div className="d-flex justify-content-center" style={{padding:"13px"}}>
                  <select  value={this.state.values} onChange={this.handleChange} className="ui search dropdown">
                  <option value>Points</option>
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  </select>
                  </div>
                  <div className="d-flex justify-content-center" style={{padding:"13px"}}>
                  <button className="ui green button" onClick={this.clickk}>Submit Grade</button>
                  </div>
                  
                  </div>
    </div>
    </div>
: <h1></h1>
}
    
    </div>
    <p className="text-dark">{JSON.stringify(this.state)}</p>
            </Base>   
        )
    }
}

