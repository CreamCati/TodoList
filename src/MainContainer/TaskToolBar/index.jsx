import React from 'react';
import {CalendarOutlined, StarOutlined, WalletOutlined} from '@ant-design/icons';
import {withRouter} from "react-router-dom";
import './index.css'

const TaskToolBar = (props) => {
    let state = props.location.state !== undefined
    let title
    let pathname
    let titleIcons
    if (state === true) {
        title = props.location.state.title
        pathname = props.location.pathname
        titleIcons = {
            "/myDay": <WalletOutlined/>,
            '/important': <StarOutlined/>,
            '/all': <CalendarOutlined/>
        }
    }
    return (
        <div className="titleContainer">
            {
                state ?
                    <div>
                        <h3>{titleIcons[pathname] || <CalendarOutlined/>}<span>{title}</span></h3>
                        <span className="date"
                              style={{display: title === "今日任务" ? '' : 'none'}}
                        >
                        {new Date().toLocaleDateString()}
                        </span>
                    </div>
                    :
                    <div>
                        欢迎使用
                    </div>
            }
        </div>
    );
};

export default withRouter(TaskToolBar);