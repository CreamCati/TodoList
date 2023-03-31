import React, {Component} from 'react';
import PubSub from 'pubsub-js'
import './index.css'
import Logo from './img/logo.jpg'

import {Button} from "antd";

class Header extends Component {

    state = {
        groups: []
    }

    addTodo = () => {
        const {formEle, selectGroupEle} = this
        const {groups} = this.state
        const selectItem = selectGroupEle.value   //选择的组名
        const plane = this.input.value
        const time = this.time.value.replace("T", " ")

        if (time !== '' && plane !== '') {
            //找出组id
            const group = groups.find((item) => {
                return item.name === selectItem
            })

            const data = {
                plane, time, done: false, group: group.id
            }
            PubSub.publish('addTodo', data);
            formEle.reset()
        } else {
            alert("未输入具体计划或未选择日期")
        }
    }

    render() {
        const {groups} = this.props

        // eslint-disable-next-line react/no-direct-mutation-state
        this.state.groups = groups

        return (
            <div className="header">
                <img className="logo" src={Logo} alt=""/>
                <form ref={(c) => {
                    this.formEle = c
                }}>
                    <div style={{display: 'block'}}>
                        <label>
                            <input ref={c => this.input = c} className="input" type="text" placeholder="输入自己的计划"/>
                        </label>
                        <label>
                            <input ref={c => this.time = c} className="date" type="datetime-local"/>
                        </label>
                        <div className="group" style={{marginLeft: '400px', background: ''}}>
                            <span>选择分组：</span>
                            <select ref={c => this.selectGroupEle = c} name="groups">
                                {
                                    groups.map((item) => {
                                        return <option key={item.id} value={item.name}>{item.name}</option>
                                    })
                                }
                            </select>
                            <Button onClick={this.addTodo} type='primary'>添加事项</Button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default Header;