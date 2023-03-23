import React, {Component} from 'react';
import './index.css'
import {Button} from "antd";
class Index extends Component {

    render() {
        const {todos} = this.props
        return (
            <div className="right">
                <ul>
                    {
                        todos.map((item)=>{
                            let done= {
                                display:"none"
                            };
                            if(item.done===true){
                                 done = {};
                            }
                            return <li  key={item.id}>
                                <div className="item">{item.description} <span className="time">{item.time}</span> <span className="state" style={done}>√</span></div>

                                <Button className="primary" danger>删除</Button>
                            </li>
                        })
                    }




                </ul>

            </div>
        );
    }
}

export default Index;