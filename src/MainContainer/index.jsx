import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import ToDay from "./PlaneList";
import './index.css'
import TaskToolBar from "./TaskToolBar";
import {MyContext} from "../App";

const MainContainer = () => {
    const {groups, setGroups} = React.useContext(MyContext).groups
    return (
        <div className="mainContainer">
            <TaskToolBar/>
            <Switch>
                <Route path='/myDay' component={ToDay}/>
                <Route path='/all' component={ToDay}/>
                <Route path='/done' component={ToDay}/>
                {
                    groups.map((v) => {
                        return <Route key={v.key} path={"/" + v.key} component={ToDay}/>
                    })
                }
                <Redirect to={"/"}/>
            </Switch>
        </div>
    );
};

export default MainContainer;