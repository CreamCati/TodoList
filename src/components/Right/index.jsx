import React, {Component} from 'react';
import './index.css'
import {Button} from "antd";
class Index extends Component {



    render() {
        return (
            <div className="right">
                <ul>
                    <li>
                        <div className="item">啦啦啦啦啦啦啦 <span>2022-2-2 20:20:20</span></div>

                        <Button className="primary" danger>删除</Button>
                    </li>

                </ul>

            </div>
        );
    }
}

export default Index;