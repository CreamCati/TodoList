import React, {useState} from 'react';
import {CalendarOutlined, StarOutlined, WalletOutlined} from '@ant-design/icons';
import {withRouter} from "react-router-dom";
import './index.css'
import {MyContext} from "../../App";
import icons from '../../globalData'
const TaskToolBar = (props) => {
    let groupKey
    if (props.location.state !== undefined) {
        groupKey = props.location.state
    }
    const {groups} = React.useContext(MyContext).groups
    let title = ' '
    let pathname
    let titleIcons
    const group = groups.find((v) => {
        return v.key === groupKey
    })
    if (groupKey) {
        if (group) {
            title = group.name
        } else {
            switch (groupKey) {
                case '/myDay':
                    title = '今日任务'
                    break
                case '/done':
                    title = '已完成'
                    break
                case '/all':
                    title = '所有任务'
                    break
            }
        }
        pathname = props.location.pathname
        titleIcons = {
            "/home/myDay": <WalletOutlined/>,
            '/home/done': <StarOutlined/>,
            '/home/all': <CalendarOutlined/>
        }
    }
    const [key,setKey] = useState(0)
    React.useEffect(() => {
        setKey(key+1)
    },[title])
    return (
        <div className="titleContainer" key={key}>
            {
                groupKey ?
                    <div>
                        <span style={{display:"block"}}>
                            {
                                titleIcons[pathname]
                                ||
                                <div
                                    className={"icon"}
                                    style={{backgroundColor: group.bgColor,
                                    color: group.fontColor}}
                                >
                                    {icons[group.icon]}
                                </div>
                            }
                            <span>{title}</span>
                        </span>
                        <span className="date"
                              style={{display: title === "今日任务" ? '' : 'none'}}
                        >
                        {new Date().toLocaleDateString()}
                        </span>
                    </div>
                    :
                    <div>欢迎使用</div>
            }
        </div>
    );
};

export default withRouter(TaskToolBar);