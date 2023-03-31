import React, {Component} from 'react';
import './index.css'
import PubSub from "pubsub-js";

class Left extends Component {

    click = (e) => {
        let title = document.getElementById("title")
        if (e.target.className === 'left') {
            return
        }

        const div = e.target
        const text = div.innerText

        // eslint-disable-next-line default-case
        switch (text) {
            case "今日":
                PubSub.publish('showGroupManage', {manage: false})
                const now = Date.now()
                title.innerText = '当前列表/今日'
                PubSub.publish('showNowTodo', {time: now})
                break;
            case "所有":
                PubSub.publish('showGroupManage', {manage: false})
                PubSub.publish('showAllTodo')
                title.innerText = '当前列表/所有'
                break;
            case "已完成":
                PubSub.publish('showGroupManage', {manage: false})
                PubSub.publish('showDoneTodo')
                title.innerText = '当前列表/已完成'
                break;
            case "分组管理":
                PubSub.publish('showGroupManage', {manage: true})
                title.innerText = '当前列表/分组管理-点击修改'
                break;
        }
    }

    render() {
        const lists = [{title: "今日", id: '101'}, {title: "所有", id: '102'}, {title: "已完成", id: '103'}, {
            title: "分组管理",
            id: '104'
        }];

        return (
            <div className="left" onClick={this.click}>
                {
                    lists.map((item) => {
                        return <div key={item.id}>{item.title}</div>
                    })
                }
            </div>
        );
    }
}

export default Left;