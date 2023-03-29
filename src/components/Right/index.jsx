import React, {Component} from 'react';
import PubSub from "pubsub-js"
import './index.css'
import Groups from "../Groups";
import Icons from '../../globalData'

class Right extends Component {

    state = {
        todos: [],
        showTodos: [],
        edit: {state: false, item: ''},
        onMouse: false,
        manage: false,
        selectItem: '',
        showType: {show: false, value: '默认分组'}

    }

    constructor(props) {
        super(props);
        if (localStorage.getItem("todos") !== null) {
            this.state.todos = JSON.parse(localStorage.getItem("todos"))
        }
        console.log()
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
        const {planeEle, newTimeEle, selectEle} = this
        const {todos} = this.state

        const newTodo = todos.map((item) => {
            if (item.id === data.id) {
                if (newTimeEle.value !== '') {
                    return {...item, plane: planeEle.value, time: newTimeEle.value.replace("T", ' ')}
                } else {
                    return {...item, plane: planeEle.value, group: selectEle.value}
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
        const index = e.target.selectedIndex - 1

        // eslint-disable-next-line react/no-direct-mutation-state
        if (index === -1) {
            this.setState({showType: {show: false, value: ''}})
            return
        }

        const selectItem = groups[index].name

        this.setState({showType: {show: true, value: selectItem}})

        // const {todos}=this.state
        // const newTdo=todos.filter((item)=>{
        //     console.log(item,selectItem)
        //     return item.group===selectItem
        // })
        // console.log(newTdo)
        // this.setState({showTodos: newTdo})

    }

    render() {
        const {showTodos, edit, manage, showType} = this.state
        const {groups} = this.props
        //console.log("manage",manage)
        return (
            <div className="right">
                <div>
                    <span id="title">当前列表/所有</span>
                    <div style={{display: manage ? 'none' : 'inline-block'}}>
                        筛选：<select name="groups" onChange={e => this.selectItem(e)}>
                        <option value="全部">全部</option>
                        {
                            groups.map((item) => {
                                return <option key={item.id} value={item.name}>{item.name}</option>
                            })
                        }
                    </select>
                    </div>
                </div>
                {
                    edit.state ?
                        (
                            <div>
                                <textarea ref={(c) => {
                                    this.planeEle = c
                                }} className="edit_area" name="" id="" defaultValue={edit.item.plane}></textarea>
                                <div>该计划的时间为：<span>{edit.item.time}</span> <br/>
                                    点击修改新时间<input ref={(c) => {
                                        this.newTimeEle = c
                                    }} className="time" type="datetime-local"/>
                                    <button onClick={() => {
                                        this.editTodo(edit.item)
                                    }} className="bt_done" style={{float: 'right'}}>完成
                                    </button>
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
                                appAddGroups={this.props.appAddGroups}
                                appEditGroups={this.props.appEditGroup}/>
                            :
                            showTodos.filter((item) => {
                                return showType.show ? item.group === showType.value : item
                            }).sort((a, b) => {
                                return new Date(b.time) - new Date(a.time)
                            }).map((item) => {
                                //console.log(item.icon.ele)

                                return <div className="item" key={item.id} onMouseEnter={() => {
                                    this.handlerMouse(true, item)
                                }} onMouseLeave={() => {
                                    this.handlerMouse(false, item)
                                }}>
                                    <div className="content">
                                        <span className="resultIcon" style={{
                                            background: item.icon.color,
                                            color: item.icon.fontColor
                                        }}>{Icons[item.icon.icon]}</span>
                                        <span className="plane">{item.plane}</span>
                                        <span className="time">{item.time}</span>
                                        <span className="group">{item.group}</span>
                                        <span className="done" style={{visibility: item.done ? '' : 'hidden'}}>√</span>
                                    </div>
                                    <div className="btns" style={{display: item.onMouse ? 'block' : 'none'}}>
                                        <button onClick={() => {
                                            this.edit(item)
                                        }} className="bt_edit" style={{display: item.done ? 'none' : ''}}>编辑
                                        </button>
                                        <button onClick={() => {
                                            this.doneTodo(item.id)
                                        }} className="bt_done">{item.done ? '取消' : '完成'}</button>
                                        <button onClick={() => {
                                            this.deleteTodo(item)
                                        }} className="bt_del">删除
                                        </button>
                                    </div>
                                </div>
                            })
                }
            </div>
        )
    }
}

export default Right;
