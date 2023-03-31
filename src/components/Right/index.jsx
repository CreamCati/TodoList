import React, {Component} from 'react';
import PubSub from "pubsub-js"
import './index.css'
import Groups from "../Groups";
import icons from "../../globalData";
import {Button, Select} from "antd";

const {Option} = Select

class Right extends Component {

    state = {
        todos: [],
        showTodos: [],
        edit: {state: false, item: ''},
        onMouse: false,
        manage: false,
        selectItem: '',
        showType: {show: false, value: ''}, //下拉框选择类型  默认false  显示时显示全部数据  true时需要传递value（组名）
        groups: []

    }

    constructor(props) {
        super(props);
        if (localStorage.getItem("todos") !== null) {
            this.state.todos = JSON.parse(localStorage.getItem("todos"))
        }

        this.state.showTodos = this.state.todos
    }

    componentDidMount() {
        this.token1 = PubSub.subscribe('addTodo', (msg, data) => {
            this.addTodo(data)
            this.setState({edit: {state: false, item: ''}})
        })
        this.token2 = PubSub.subscribe('showNowTodo', (msg, data) => {
            const {todos} = this.state
            const newTodo = todos.filter((item) => {
                return new Date(item.time).toLocaleDateString() === new Date(data.time).toLocaleDateString()
            })
            this.setState({showTodos: newTodo, edit: {state: false, item: ''}})
        })
        this.token3 = PubSub.subscribe('showAllTodo', () => {
            this.setState({showTodos: this.state.todos, edit: {state: false, item: ''}})
        })
        this.token4 = PubSub.subscribe('showDoneTodo', () => {
            const {todos} = this.state
            const newTdo = todos.filter((item) => {
                return item.done === true
            })
            this.setState({showTodos: newTdo, edit: {state: false, item: ''}})
        })
        this.token5 = PubSub.subscribe('showGroupManage', (msg, data) => {
            this.setState({manage: data.manage})
        })
    }

    componentWillUnmount() {  //取消订阅
        PubSub.unsubscribe(this.token1)
        PubSub.unsubscribe(this.token2)
        PubSub.unsubscribe(this.token3)
        PubSub.unsubscribe(this.token4)
        PubSub.unsubscribe(this.token5)
    }

    updateTodos = (newTodos) => {
        console.log(newTodos)
        this.setState({todos: newTodos,showTodos: newTodos})
    }
    addTodo = (todo) => {
        const {todos} = this.state

        if (todos.length === 0) {
            todo["id"] = 10000001
        } else {
            const id_arr = todos.map(item => item.id)
            todo["id"] = Math.max(...id_arr) + 1
        }

        const newTodos = [todo, ...todos]

        this.setState({showTodos: newTodos, todos: newTodos})
        localStorage.setItem("todos", JSON.stringify(newTodos))
    }
    doneTodo = (id) => {
        const {showTodos, todos} = this.state

        const newTodo = showTodos.map((item) => {
            if (item.id === id) {
                return {...item, done: !item.done}
            } else {
                return item
            }
        })

        const newTodos = todos.map((j) => {
            if (j.id === id) {
                return {...j, done: !j.done}
            } else {
                return j
            }
        })

        this.setState({showTodos: newTodo, todos: newTodos})
        localStorage.setItem("todos", JSON.stringify(newTodos))
    }
    edit = (item) => {
        this.setState({edit: {state: true, item}})
    }
    editTodo = (data) => {
        //      计划         时间         组
        const {planeEle, newTimeEle, selectEle} = this
        const {todos, groups} = this.state

        //找出对应的组
        const group = groups.find((v) => {
            return v.name === selectEle.value
        })

        const newTodo = todos.map((item) => {
            if (item.id === data.id) {
                if (newTimeEle.value !== '') {
                    return {...item, plane: planeEle.value, time: newTimeEle.value.replace("T", ' '),group: group.id}
                } else {
                    return {...item, plane: planeEle.value, group: group.id}
                }
            } else {
                return item
            }
        })

        this.setState({showTodos: newTodo, todos: newTodo, edit: {state: false}})
        localStorage.setItem("todos", JSON.stringify(newTodo))
    }

    deleteTodo = (data) => {
        if (!window.confirm('是否删除？')) {
            return
        }
        const {showTodos, todos} = this.state
        const newTodo = showTodos.filter((item) => {
            return item.id !== data.id
        })

        const newTodos = todos.filter(item => item.id !== data.id)

        this.setState({showTodos: newTodo, todos: newTodos})
        localStorage.setItem("todos", JSON.stringify(newTodo))
    }

    handlerMouse = (flag, item1) => {
        const {showTodos} = this.state
        const newTodo = showTodos.map((item) => {
            if (item.id === item1.id) {
                return {...item, onMouse: flag}
            } else {
                return item
            }
        })

        this.setState({showTodos: newTodo})
    }

    selectItem = (e) => {
        const {groups} = this.props
        const {todos} = this.state

        if (e === "全部") {
            this.setState({showType: {show: false, value: ''}})
            return
        }

        this.setState({showType: {show: true, value: e}})
        //找出组id
        const group = groups.find((v) => {
            return v.name === e
        })

        const newTdo = todos.filter((item) => {
            return item.group === group.id
        })
        this.setState({showTodos: newTdo, showType: {show: true, value: group.id}})

    }

    render() {
        const {showTodos, edit, manage, showType} = this.state
        const {groups} = this.props
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state.groups = groups
        return (
            <div className="right">
                <div>
                    <span id="title">当前列表/所有</span>
                    <div style={{display: manage||edit.state ? 'none' : 'inline-block'}}>
                        &nbsp;&nbsp;筛选：
                        <Select defaultValue={"全部"} style={{width: "100px"}} name="groups" onChange={this.selectItem}>
                            <Option value="全部">全部</Option>
                            {
                                groups.map((item) => {
                                    return <Option key={item.id} value={item.name}>{item.name}</Option>
                                })
                            }
                        </Select>
                    </div>
                </div>
                {
                    edit.state ?
                        (
                            <div>
                                <textarea ref={c => this.planeEle = c} className="edit_area"
                                          defaultValue={edit.item.plane}></textarea>
                                <div>该计划的时间为：<span>{edit.item.time}</span> <br/>
                                    点击修改新时间<input ref={(c) => {
                                        this.newTimeEle = c
                                    }} className="time" type="datetime-local"/>
                                    <Button onClick={() => {
                                        this.editTodo(edit.item)
                                    }} type={"primary"} style={{float: 'right'}}>完成
                                    </Button>
                                    <div>
                                        归属分类：
                                        <select ref={(c) => {
                                            this.selectEle = c
                                        }} name="groups">
                                            {
                                                groups.map((item) => {
                                                    return <option key={item.id} value={item.name}>{item.name}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                        ) : manage ?
                            <Groups
                                groups={groups}
                                todos={this.state.todos}
                                updateTodos={this.updateTodos}
                                appAddGroups={this.props.appAddGroups}
                                appEditGroups={this.props.appEditGroup}/>
                            :
                            //展示列表
                            (
                                showTodos.filter((item) => {  //是否需要按组显示

                                    return showType.show ? item.group === showType.value : item
                                }).sort((a, b) => {  //时间降序
                                    return new Date(b.time) - new Date(a.time)
                                }).map((item) => {   //渲染
                                    let groupName = groups.find((v) => {
                                        return v.id === item.group
                                    })
                                    if (groupName === undefined) {
                                        groupName = {
                                            id: 0,
                                            name: "无分组",
                                            currentIcon: 'smile',
                                            currentColor: '#ffffff',
                                            fontColor: '#000000',
                                        }
                                    }
                                    return <div className="item" key={item.id} onMouseEnter={() => {
                                        this.handlerMouse(true, item)
                                    }} onMouseLeave={() => {
                                        this.handlerMouse(false, item)
                                    }}>
                                        <div className="content">
                                        <span className="resultIcon" style={{
                                            background: groupName.currentColor,
                                            color: groupName.fontColor
                                        }}>{icons[groupName.currentIcon]}</span>
                                            <span className="plane">{item.plane}</span>
                                            <span className="time">{item.time}</span>
                                            <span className="group">{groupName.name}</span>
                                            <span className="done" style={{visibility: item.done ? '' : 'hidden'}}>√</span>

                                            <div style={{display: item.onMouse ? 'block' : 'none'}}>
                                                <Button type={"default"} onClick={() => {
                                                    this.edit(item)
                                                }} style={{display: item.done ? 'none' : ''}}>编辑
                                                </Button>
                                                <Button onClick={() => {
                                                    this.doneTodo(item.id)
                                                }} type={"primary"}>{item.done ? '取消' : '完成'}</Button>
                                                <Button onClick={() => {
                                                    this.deleteTodo(item)
                                                }} danger type={"primary"}>删除
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                })
                            )
                }
            </div>
        )
    }
}

export default Right;
