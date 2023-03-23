import React, {Component} from 'react';

import './App.css'
import Header from "./components/Header";
import Left from "./components/Left";
import Right from  "./components/Right"

class App extends Component {
    render() {
        return (
            <div className="app_content">
                <div className="top"><Header/></div>
                <div className="content ">
                    <div className="left"><Left/></div>
                    <div className="right"><Right/></div>
                </div>
                <div className="clear"></div>
            </div>
        );
    }
}

export default App;