import React, {useState} from 'react';
import './App.css'
import Header from "./Header";
import SideBar from "./SideBar";
import MainContainer from "./MainContainer";
import Edit from "./Edit";

const Todos = [
    {id: '1001', plane: '今日任务没完成', time: '2023-4-3 20:20:20', groupKey: 'fenzu1', done: false},
    {id: '1002', plane: '完成了', time: '2022-2-2 20:20:20', groupKey: 'fenzu2', done: true},
    {id: '1007', plane: '没完成', time: '2022-2-3 20:20:20', groupKey: 'fenzu3', done: false},
    {id: '1004', plane: '没有分组的任务', time: '2022-2-3 20:20:20', groupKey: '', done: false}
]
const ShowTodos = []
const Groups = [
    {name: '默认分组1', key: 'fenzu1'},
    {name: '默认分组2', key: 'fenzu2'},
    {name: '默认分组3', key: 'fenzu3'}
]
export const MyContext = React.createContext()
export default function App() {
    const [todos, setTodos] = useState(Todos)
    const [groups, setGroups] = useState(Groups)
    const [showTodos, setShowTodos] = useState(ShowTodos)
    const [show, setShow] = useState({state: false, data: {}})
    const data = {
        todos: {todos, setTodos},
        groups: {groups, setGroups},
        showTodos: {showTodos, setShowTodos},
        editShow: {show, setShow}
    }

    React.useEffect(() => {
        console.log("页面挂载")
        // if (localStorage.getItem("todos") !== null) {
        //     this.state.groups = JSON.parse(localStorage.getItem("todos"))
        // } else {
        //     this.state.groups = [
        //         {
        //             id: 1,
        //             name: "默认分组",
        //             currentIcon: 'smile',
        //             currentColor: '#ffffff',
        //             fontColor: '#000000',
        //         }
        //     ]
        // }
    }, [])

    React.useEffect(() => {
        console.log("保存todos")
        // localStorage.setItem("todos", JSON.stringify(data))
    }, [todos])

    return <>
        <MyContext.Provider value={data}>
            <Header/>
            <div className="container">
                <SideBar/>
                <MainContainer/>
                <Edit/>
            </div>
        </MyContext.Provider>
    </>
}