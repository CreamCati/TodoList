import React, {Component} from 'react';
import Header from "./components/Header";
import Left from "./components/Left";
import Right from "./components/Right";
import './App.css'


class App extends Component {

    constructor(props) {
        super(props);

        if (localStorage.getItem("groups") !== null) {
            this.state.groups = JSON.parse(localStorage.getItem("groups"))
        } else {
            this.state.groups = [
                {
                    id: 1,
                    name: "默认分组",
                    currentIcon: 'smile',
                    currentColor: '#ffffff',
                    fontColor: '#000000',
                }
            ]
        }
    }

    state = {
        groups: []
    }

    editGroup = (data) => {
        this.setState({groups: data})
        localStorage.setItem("groups", JSON.stringify(data))

    }

    render() {
        return (
            <div className="container">
                <Header groups={this.state.groups}/>
                <Left/>
                <Right
                    groups={this.state.groups}
                    appEditGroup={this.editGroup}/>
            </div>

        );
    }
}

export default App;