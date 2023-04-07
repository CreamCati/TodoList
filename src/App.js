import React, {useState} from 'react';
import './App.css'
import Header from "./Header";
import SideBar from "./SideBar";
import MainContainer from "./MainContainer";
import Edit from "./Edit";
import {Redirect, Route, Switch} from "react-router-dom";
import ManageGroup from "./ManageGroup";

const Todos = []
const ShowTodos = []
const Groups = []
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
        if (localStorage.getItem("groups") !== null) {
            setGroups(eval(JSON.parse(localStorage.getItem("groups"))))
            console.log("111",eval(JSON.parse(localStorage.getItem("groups"))))
        }
        if (localStorage.getItem("todos") !== null) {
            setTodos(eval(JSON.parse(localStorage.getItem("todos"))))
        }
    }, [])

    React.useEffect(() => {
            localStorage.setItem("todos", JSON.stringify(todos))
            localStorage.setItem("groups", JSON.stringify(groups))
    }, [todos,groups])

    return <>
        <MyContext.Provider value={data}>
            <Header/>
            <div className="container">
                <SideBar/>
                <Switch>
                    <Route path={'/home'} component={MainContainer}/>
                    <Route path={'/manage'} component={ManageGroup}/>
                    <Redirect to={'/home'}/>
                </Switch>
                {
                    show.state ? <Edit/> : ''
                }
            </div>
        </MyContext.Provider>
    </>
}