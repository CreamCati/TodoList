import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import ToDay from "./PlaneList";
import './index.css'
import TaskToolBar from "./TaskToolBar";
import {MyContext} from "../App";
import ManageGroup from "../ManageGroup";

const MainContainer = () => {
    const {groups} = React.useContext(MyContext).groups

    return (
        <div className="mainContainer">
            <TaskToolBar/>
            <Switch>
                <Route path='/home/myDay' component={ToDay}/>
                <Route path='/home/all' component={ToDay}/>
                <Route path='/home/done' component={ToDay}/>
                {
                    groups.map((v) => {
                        return <Route key={v.key} path={"/home" + v.key} component={ToDay}/>
                    })
                }
                <Route path={'/manage'} component={ManageGroup}/>
                <Redirect to={"/home"}/>
            </Switch>
        </div>
    );
};

export default MainContainer;