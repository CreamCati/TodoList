import React, {Component} from 'react';
import Header from "./components/Header";
import Left from "./components/Left";
import Right from "./components/Right";
import './App.css'
class App extends Component {
    render() {
        return (
            <div className="container">
                <Header/>
                <Left/>
                <Right/>
            </div>

        );
    }
}

export default App;