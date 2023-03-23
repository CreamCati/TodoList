import React, {Component} from 'react';
import {Button} from "antd";
import './index.css'

class Left extends Component {
    render() {
        return (
            <div className="left">
                <ul>
                    <li><Button type={"link"}>今日</Button></li>
                    <li><a href=""><Button type={"link"}>所有</Button></a></li>
                    <li><a href=""><Button type={"link"}>已完成</Button></a></li>
                </ul>
            </div>
        );
    }
}

export default Left;