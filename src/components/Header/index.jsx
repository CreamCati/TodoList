import React, {Component} from 'react';
import PubSub from 'pubsub-js'
import './index.css'
import Logo from './img/logo.jpg'

class Header extends Component {

    addTodo=()=>{

        const plane=this.input.value
        const time=this.time.value.replace("T"," ")

        if(time!==''&&plane!==''){

            const data={plane,time,done:false}
            PubSub.publish('addTodo',data);
        }else{
            alert("未输入具体计划或未选择日期")
        }

    }

    render() {
        return (
            <div className="header">
                <div className="">
                    <img className="logo" src={Logo}/>
                    <label>
                        <input ref={(c)=>{this.input=c}} className="input" type="text" placeholder="输入自己的计划"/>
                    </label>

                    <label>
                        <input ref={(c)=>{this.time=c}} className="date" type="datetime-local"/>
                    </label>
                    <button onClick={this.addTodo} className="add">添加</button>
                </div>

            </div>
        );
    }
}

export default Header;