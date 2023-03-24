import React, {Component} from 'react';
import {Button} from "antd";
import './index.css'
class Right extends Component {

    delTodo=(id)=>{

        this.props.deleteTodo(id)

    }
    changeTodo=(id)=>{
        return ()=>{
            this.props.changeTodo(id)
        }
    }
    handlerUpdate=()=> {
        console.log("进行修改")
    }
    render() {
        const {todos,showTodos} = this.props
        showTodos.sort((a,b)=>{
            return new Date(b.time)-new Date(a.time)
        })
        console.log("right加载")
        console.log("总",todos)
        console.log("显示",showTodos)
        return (
            <div className="right">
                <ul>
                    {
                        showTodos.map((item)=>{
                            let done= {
                                display:"none"
                            }
                            if(item.done===true){
                                 done = {};
                            }
                            return <li  key={item.id}>
                                <div className="bg-line" onDoubleClick={this.handlerUpdate}><div className="item">{item.description}</div> <span className="time">{item.time}</span> <span className="state" style={done}>√</span></div>
                                <div className="btns">
                                    <Button className="primary" onClick={this.changeTodo(item.id)} style={{display:item.done?'none':''}}>完成</Button>
                                    <Button className="primary" danger onClick={()=>{this.delTodo(item.id)}}>删除</Button>
                                </div>

                            </li>
                        })
                    }

                </ul>

            </div>
        );
    }
}

export default Right;