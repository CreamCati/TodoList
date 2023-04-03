import React from 'react';
import {Checkbox, Popover} from "antd";
import './index.css'
import {MyContext} from "../../../App";

const Item = (props) => {
    const {data} = props
    const {groups, setGroups} = React.useContext(MyContext).groups
    const {todos, setTodos} = React.useContext(MyContext).todos
    const {setShow} = React.useContext(MyContext).editShow
    const date = new Date(data.time);

    const formatter = new Intl.DateTimeFormat('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false
    });

    function handleCheckboxChange(e) {
        const data = e.target.name
        const check = e.target.checked
        console.log(groups)
        data.done = check
        const newTodos = todos.map((v) => {
            if (v.id === data.id) {
                return data
            } else {
                return v
            }
        })
        setTodos(newTodos)
        console.log(data, check)
    }

    function onPlaneClick(data) {
        setShow({state: true, data: data})
    }

    return (
        <div>
            <div className={"planeItem"} onClick={() => {
                onPlaneClick(data)
            }}>
                <div className={'ckBox'}>
                    <Checkbox className={"checkBox"} defaultChecked={data.done} name={data}
                              onChange={handleCheckboxChange}/>
                </div>
                <div>
                    <div>{data.plane}</div>
                    <div className={"date"}>{formatter.format(date)}&nbsp;{data.groupKey}</div>
                </div>
            </div>
        </div>


    );
};

export default Item;