import React, {Component} from 'react';
import {Button, Input} from 'antd';
import './index.css'
import Logo from './img/logo.jpg'

class Header extends Component {

    render() {

        return (
            <div className="header">
                <div className="header_logo"><img  width='200px' srcSet={Logo} alt="111"></img></div>
                <div className="header_add">
                    <form action="">
                        <Input ref={(c)=>{this.add=c}} type="text" name="add" id="add" placeholder="输入自己的计划" rootClassName="header_add_input" />
                        <Input ref={(c)=>{this.time=c}} type="datetime-local" rootClassName="header_timepicker"/>
                        <Button type="primary" onClick={this.addData}>添加</Button>
                    </form>
                </div>
                <div className="clear"></div>
            </div>
        );
    }

    addData=()=>{
        const add=this.add.input.value
        const time = this.time.input.value.replace("T"," ")

        const data={description:add,time:time,done:false}

        const reg=/^\d{4}-\d{1,2}-\d{1,2} \d{1,2}:\d{1,2}/
        console.log()
        if(add.trim()!==''&&reg.test(time)){

            this.props.post(data)
        }else{
            alert("未输入具体计划或未选择日期")
        }

    }
}

export default Header;
