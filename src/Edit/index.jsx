import React, {useState} from 'react'
import './index.css'
import {MyContext} from "../App"
import dayjs from 'dayjs'
import {Button, Checkbox, DatePicker, Input, Select, TimePicker} from "antd";
import {CloseCircleOutlined} from "@ant-design/icons";

const Edit = () => {
    const {groups} = React.useContext(MyContext).groups
    const {todos, setTodos} = React.useContext(MyContext).todos
    const {show, setShow} = React.useContext(MyContext).editShow

    const group = groups.find((v) => {
        return v.key === show.data.groupKey
    })

    let arr = show.data.time.split(" ")
    const date = dayjs(arr[0], 'YYYY-MM-DD')
    const time = dayjs(arr[1], 'HH:mm')
    const [key, setKey] = useState(0)
    React.useEffect(() => {
        setKey(key + 1)
        console.log(show.data.plane)
    }, [todos, show])

    let ckBox, plane, datePicker, timePicker, groupKey

    function handleCheckboxChange(e) {
        ckBox = e.target.checked
    }

    function handleChangeDatePicker(date, dateString) {
        datePicker = dateString
    }

    function handleChangeTimePicker(time, timeString) {
        timePicker = timeString
    }

    function handleChangeSelect(e) {
        groupKey = e
    }

    function handleChangeInput(e) {
        plane = e.target.value
    }

    function closeA() {
        setShow({state: false})
    }

    function onFinish() {
        const t1 = datePicker ? datePicker : arr[0]
        const t2 = timePicker ? timePicker : arr[1]
        const data = {
            id: show.data.id,
            plane: plane ? plane : show.data.plane,
            time: t1 + " " + t2,
            groupKey: groupKey ? groupKey : show.data.groupKey,
            done: ckBox ? ckBox : show.data.done
        }
        const newTodos = todos.map((v) => {
            if (v.id === data.id) {
                return data
            } else {
                return v
            }
        })
        setTodos(newTodos)
        setShow({state: false})
    }

    return (<div className={"edit"} style={{display: show.state ? '' : 'none'}} key={key}>
        <p onClick={closeA}><CloseCircleOutlined className={"icon_close"}/></p>
        <br/>
        <div className={"item"}>
            <Checkbox className={"checkBox"} defaultChecked={show.data.done} name={show.data}
                      onChange={handleCheckboxChange}/>
            <Input defaultValue={show.data.plane} onChange={handleChangeInput} className={"plane"}/>
        </div>
        <div className={"item"}>
            <span>修改时间：</span>
            <DatePicker allowClear={false} className={"datePicker"} defaultValue={date}
                        onChange={handleChangeDatePicker}/>
            <TimePicker allowClear={false} className={"timePicker"} defaultValue={time} format={"HH:mm"}
                        onChange={handleChangeTimePicker}/>
        </div>
        <div className={"item"}>
            <span>移动分组：</span>
            <Select
                onChange={handleChangeSelect}
                defaultValue={group ? group.name : '暂无分组'}
                style={{width: 120}}
                options={
                    groups.map((v) => {
                        return {value: v.key, label: v.name}
                    })
                }
            />
        </div>
        <Button style={{margin: '10px 0 '}} type={"primary"} onClick={onFinish}>修改</Button>
    </div>);
};

export default Edit;