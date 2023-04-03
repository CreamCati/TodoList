import React, {useRef} from 'react';
import './index.css'
import {Button, DatePicker, Form, Input, TimePicker} from "antd";
import {Redirect, withRouter} from "react-router-dom";
import {MyContext} from "../../App";
import Item from "./Item";

function randKey() {
    let result = ''
    let length = 10
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    const charactersLength = characters.length
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
}

const PlaneList = (props) => {
    if (props.location.state === undefined) {
        return <Redirect to={"/"}/>
    }
    const {showTodos, setShowTodos} = React.useContext(MyContext).showTodos
    const {todos, setTodos} = React.useContext(MyContext).todos
    const {groups, setGroups} = React.useContext(MyContext).groups
    const title = props.location.state.title
    const [form] = Form.useForm()

    React.useEffect(() => {
        const group = groups.find((v) => {
            return v.name === title
        })
        if (group === undefined) {
            switch (title) {
                case "今日任务":
                    setShowTodos(todos.filter((v) => {
                        return new Date(v.time).toLocaleDateString() === new Date().toLocaleDateString()
                    }))
                    console.log("今日")
                    break
                case "已完成":
                    setShowTodos(todos.filter((v) => {
                        return v.done === true
                    }))
                    console.log("已完成")
                    break
                case "所有任务":
                    setShowTodos([...todos])
                    console.log("所有任务")
                    break
            }
        } else {
            setShowTodos(todos.filter((v) => {
                return v.groupKey === group.key
            }))
        }
    }, [todos, title])

    const onFinish = (values) => {
        const {DatePicker, TimePicker, todo} = values
        const date = new Date(DatePicker).toLocaleDateString() + " " + new Date(TimePicker).toLocaleTimeString()
        const newTodo = {id: randKey(), plane: todo, time: date, groupKey: '', done: false}
        const newTodos = [...todos, newTodo]
        setTodos(newTodos)

    };

    return (
        <div>
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
                            <DatePicker/>
                        </Form.Item>
                        <Form.Item label="选择时间"
                                   name="TimePicker"
                                   rules={[
                                       {
                                           required: true,
                                       },
                                   ]}
                        >
                            <TimePicker/>
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