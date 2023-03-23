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
                    <Input type="text" name="add" id="add" placeholder="输入自己的计划" rootClassName="header_add_input" />
                    <Input type="datetime-local" rootClassName="header_timepicker"/>
                    <Button type="primary">添加</Button>
                </div>
                <div className="clear"></div>
            </div>
        );
    }
}

export default Header;
