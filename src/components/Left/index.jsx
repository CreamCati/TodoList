import React, {Component} from 'react';
import './index.css'
import PubSub from "pubsub-js";
class Left extends Component {

    componentDidMount() {

    }


    click=(e)=>{
        let title=document.getElementById("title")
        if(e.target.className==='left'){
            return
        }


        const div=e.target
        const text = div.innerText


        switch (text){
            case "今日":
                const now= Date.now()
                title.innerText='今日'
                PubSub.publish('showNowTodo',{time:now})
                break;
            case "所有":
                PubSub.publish('showAllTodo')

                title.innerText='所有'
                break;
            case "已完成":
                PubSub.publish('showDoneTodo')
                title.innerText='已完成'

                break;

        }

    }
    render() {
        const lists=[{title:"今日",id:'101'},{title:"所有",id:'102'},{title:"已完成",id:'103'},];

        return (
            <div className="left" onClick={this.click}>
                {
                    lists.map((item)=>{
                        return <div key={item.id}>{item.title}</div>
                    })
                }

            </div>
        );
    }
}

export default Left;