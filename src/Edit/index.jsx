import React, {useState} from 'react';
import './index.css'
import {MyContext} from "../App";
import {Checkbox, DatePicker, Input, TimePicker} from "antd";
import moment from "moment";

const Edit = () => {
    // const {show,setShow} = React.useContext(MyContext).editShow
    // const {state,data} = show
    // console.log(show.data)
    // const [value, setValue] = useState(data.plane);
    const [date, setDate] = useState(moment('2023-04-03', 'YYYY-MM-DD'))
    const [time, setTime] = useState(moment('12:34:56', 'HH:mm:ss'))
    // function handleCheckboxChange(e) {
    //     console.log(e)
    // }
    function handleChangeDatePicker(date, dateString) {
        setDate(date)
        console.log(dateString)
    }

    function handleChangeTimePicker(time, timeString) {
        setTime(time)
        console.log(timeString)
    }

    // function handleChange(event) {
    //     setValue(event.target.value);
    // }

    return (
        // style={{display:state?'':'none'}}
        <div className={"edit"}>
            <div>
                {/*<Checkbox className={"checkBox"} defaultChecked={data.done} name={data}  onChange={handleCheckboxChange}/>*/}
                {/*<Input value={value} onChange={handleChange} rootClassName={"plane"}/>*/}
                <DatePicker defaultValue={date} onChange={handleChangeDatePicker}/>
                <TimePicker defaultValue={time} onChange={handleChangeTimePicker}/>
            </div>
        </div>
    );
};

export default Edit;