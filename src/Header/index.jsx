import React from 'react';
import './index.css'
import {Input} from "antd";
import {SearchOutlined} from "@ant-design/icons";

const Header = () => {
    return (
        <div className="header">
            <span className="title">To Do</span>
            <div className="search">
                <Input rootClassName="input" placeholder="default size" prefix={<SearchOutlined/>}/>
            </div>
        </div>
    );
};

export default Header;