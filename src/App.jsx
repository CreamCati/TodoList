import React, {Component} from 'react';

import './App.css'
import Header from "./components/Header";
import Left from "./components/Left";
import Right from  "./components/Right"

class App extends Component {

    state={
        todos:[
            //{id:'10000001',description:'吃饭',time:'2000-2-2 20:20',done:true}
        ]
    }
    post =(data)=>{
        const {todos}=this.state
        let id
        if(todos.length===0){
            data["id"]='10000001'
        }else{
            id=+todos[0].id+1
            data["id"]=id
        }


        const newTodos=[data,...todos]
        this.setState({todos: newTodos})
    }
    render() {
        let {todos}=this.state
        todos.sort((a,b)=>{
            return b.id-a.id
        })
        if(todos.length===0){
            return (
                <div className="app_content">
                    <div className="top"><Header post={this.post}/></div>
                    <div className="content ">
                        <div className="left"><Left/></div>

                    </div>
                    <div className="clear"></div>
                </div>
            );
        }
        console.log("App",todos)
        return (
            <div className="app_content">
                <div className="top"><Header post={this.post}/></div>
                <div className="content ">
                    <div className="left"><Left/></div>
                    <div className="right" ><Right todos={todos}/></div>
                </div>
                <div className="clear"></div>
            </div>
        );
    }
}

export default App;