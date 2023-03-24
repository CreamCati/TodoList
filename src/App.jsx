import React, {Component} from 'react';

import './App.css'
import Header from "./components/Header";
import Left from "./components/Left";
import Right from  "./components/Right"

class App extends Component {

    state={
        todos:[
            {id:'10000001',description:'吃饭1',time:'2000-2-2 20:20',done:true},
            {id:'10000002',description:'吃饭2',time:'2023-3-24 20:20',done:false},
            {id:'10000003',description:'吃饭3',time:'2000-2-2 20:20',done:true}
        ],
        showTodos:[]
    }
    constructor(props) {
        super(props);
        this.state.showTodos=this.state.todos
    }
    postTodo =(data)=>{
        const {todos}=this.state
        let id
        if(todos.length===0){
            data["id"]=10000001
        }else{
            id=+todos[0].id+1
            data["id"]=id
        }

        const newTodos=[data,...todos]
        this.setState({showTodos: newTodos,todos: newTodos})
    }
    changeTodo=(id)=>{
        const {todos}=this.state
        const newTodo = todos.map((item)=>{
            if(item.id===id){
                return {...item,done:true}
            }else{
                return item
            }
        })
        this.setState({showTodos: newTodo,todos: newTodo})
    }
    deleteTodo=(id)=>{
        const {todos}=this.state
        const newTodo = todos.filter((item)=>{
            return item.id!==id
        })
        this.setState({showTodos: newTodo,todos: newTodo})
    }

    showNowList=(date)=>{
        const {todos}=this.state
        const newTodo = todos.filter((item)=>{
            return new Date(item.time).toLocaleDateString()===new Date(date).toLocaleDateString()
        })
        this.setState({showTodos: newTodo})

    }
    showDoneList=()=>{
        const {todos}=this.state
        const newTdo=todos.filter((item)=>{
            return item.done===true
        })

        this.setState({showTodos: newTdo})
    }
    showAllList=()=>{
        this.setState({showTodos: this.state.todos})
    }
    render() {
        let {todos,showTodos}=this.state


        return (
            <div className="app_content">
                <div className="top"><Header postTodo={this.postTodo}/></div>
                <div className="content ">
                    <Left showNowList={this.showNowList} showDoneList={this.showDoneList} showAllList={this.showAllList}/>
                    <Right todos={todos} showTodos={showTodos} changeTodo={this.changeTodo} deleteTodo={this.deleteTodo}/>
                </div>
                <div className="clear"></div>
            </div>
        );

    }
}

export default App;