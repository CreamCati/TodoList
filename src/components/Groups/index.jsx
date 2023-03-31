import React, {Component} from 'react';
import './index.css'
import {Button} from "antd";
import Item from "./Item";

class Groups extends Component {

    state = {
        open: false
    }

    updateGroup = (item) => {
        this.props.appEditGroups(item)

    }

    addGroup = () => {   //待改进  id递增问题
        const {nameEle} = this
        const {groups} = this.props
        const name = nameEle.value.trim()

        if (name === "") {
            return
        }
        if (name.length >= 15) {
            alert("名字太长啦！")
            return
        }
        if (groups.find((v) => {
            return v.name === name
        })) {
            alert("已存在！")
            return
        }
        const id_arr = groups.map(item => item.id)
        const group = {
            id: Math.max(...id_arr) + 1,
            name: name,
            currentIcon: 'smile',
            currentColor: '#ffffff',
            fontColor: '#000000',
        }
        const newGroups = [...groups, group]

        this.props.appEditGroups(newGroups)
        localStorage.setItem("groups", JSON.stringify(newGroups))
        nameEle.value = ''
    }


    render() {
        const {groups} = this.props

        return (
            <div className="groups">
                {
                    groups.map((item) => {
                        return <Item item={item} key={item.id}
                                     updateGroup={this.updateGroup}
                                     groups={groups}
                        />
                    })
                }
                <input ref={c => this.nameEle = c} className="newGroup" type="text" placeholder="此处添加新的分组"/>
                <Button onClick={this.addGroup}>添加新分组</Button>
            </div>
        );
    }
}

export default Groups;