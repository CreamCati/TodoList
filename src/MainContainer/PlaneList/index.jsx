import React, {useState} from 'react';
import './index.css'
import {Button, DatePicker, Form, Input, TimePicker} from "antd";
import {Redirect, withRouter} from "react-router-dom";
import {MyContext} from "../../App";
import Item from "./Item";
import dayjs from "dayjs";
import {randKey} from "../../utils";

const PlaneList = (props) => {
    if (props.location.state === undefined) {
        return <Redirect to={"/"}/>
    }

    let {showTodos} = React.useContext(MyContext).showTodos
    const {todos, setTodos} = React.useContext(MyContext).todos
    const {groups} = React.useContext(MyContext).groups
    const groupKey = props.location.state
    const [form] = Form.useForm()
    const [key, setKey] = useState(0)

    React.useEffect(() => {
        setKey(key + 1)
    }, [todos]);

    const group = groups.find((v) => {
        return v.key === groupKey
    })

    if (group === undefined) {
        switch (groupKey) {
            case "/myDay":
                showTodos = (todos.filter((v) => {
                    return new Date(v.time).toLocaleDateString() === new Date().toLocaleDateString()
                }))
                console.log("今日")
                break
            case "/done":
                showTodos = (todos.filter((v) => {
                    return v.done === true
                }))
                console.log("已完成")
                break
            case "/all":
                showTodos = ([...todos])
                console.log("所有任务")
                break
        }
    } else {
        showTodos = (todos.filter((v) => {
            return v.groupKey === group.key
        }))
    }

    //添加新组
    const onFinish = (values) => {
        const {DatePicker, TimePicker, todo} = values
        const date = dayjs(new Date(DatePicker)).format('YYYY-MM-DD') + " " + dayjs(new Date(TimePicker)).format('HH:mm')
        const newTodo = {id: randKey(), plane: todo, time: date, groupKey: groupKey, done: false}
        const newTodos = [...todos, newTodo]
        setTodos(newTodos)
    };
    return (
        <div key={key}>
            <div className="addTodo">
                <Form
                    form={form}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="todo"
                        label="添加任务"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <div className="datePicker">
                        <Form.Item label="选择日期"
                                   name="DatePicker"
                                   rules={[
                                       {
                                           required: true,
                                       },
                                   ]}
                        >
                            <DatePicker format={'YYYY-MM-DD'}/>
                        </Form.Item>
                        <Form.Item label="选择时间"
                                   name="TimePicker"
                                   rules={[
                                       {
                                           required: true,
                                       },
                                   ]}
                        >
                            <TimePicker format={"HH:mm"}/>
                        </Form.Item>
                        <Button className="btn_add" type="primary" htmlType="submit">添加</Button>
                    </div>
                </Form>
            </div>
            <br/>
            {
                showTodos.map((v) => {
                    return <Item key={v.id} data={v}/>
                })
            }
        </div>
    );
};

export default withRouter(PlaneList);