import React, {Component} from 'react';
import {Button} from "antd";
import './index.css'

class Left extends Component {


    click=(e)=>{

        const text = e.target.innerText

        switch (text){
            case "今日":
                alert("now")
                break;
            case "所有":
                alert("all")
                break;
            case "已完成":
                alert("done")
                break;
        }

    }

    render() {
        const lists=[{title:"今日",id:'101'},{title:"所有",id:'102'},{title:"已完成",id:'103'},];
        return (
            <div className="left" onClick={this.click}>
                <ul>
                    {
                        lists.map((item)=>{
                            return <li key={item.id}><Button type={"link"} >{item.title}</Button></li>
                        })
                    }
                </ul>
            </div>
        );
    }
}

export default Left;