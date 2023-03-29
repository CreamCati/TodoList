import React, {Component} from 'react';
import PubSub from 'pubsub-js'
import './index.css'
import Logo from './img/logo.jpg'

import {Popover} from "antd";
import icons from '../../globalData'

class Header extends Component {

    state = {

        open: false,
        currentIcon: 'smile',
        currentColor: '#ffffff',
        fontColor: '#000000'
    }

    addTodo = () => {
        const {currentIcon, currentColor, currentEle, fontColor} = this.state
        const {formEle, selectGroupEle} = this

        const selectItem = selectGroupEle.value

        const plane = this.input.value
        const time = this.time.value.replace("T", " ")

        if (time !== '' && plane !== '') {
            console.log(currentEle)
            const data = {
                plane, time, done: false, group: selectItem,
                icon: {icon: currentIcon, color: currentColor, fontColor}
            }
            console.log(data)
            PubSub.publish('addTodo', data);
            this.setState({currentColor: '#000000'})
            formEle.reset()
        } else {
            alert("未输入具体计划或未选择日期")
        }
    }


    handleColorSelect = (e) => {
        const color = e.target.value
        const {resultIconEle} = this
        const rgb = color.replace("#", "");

        let r = parseInt(rgb.substring(0, 2), 16);
        let g = parseInt(rgb.substring(2, 4), 16);
        let b = parseInt(rgb.substring(4, 6), 16);

        let avg = (r + g + b) / 3;
        let hexColor

        //根据灰度计算前景色
        if (avg <= 128) {
            hexColor = "#ffffff"; // 白色
        } else {
            hexColor = "#000000"; // 黑色
        }

        // 生成高对比度前景色
        // let newR = r < avg ? 0 : 255;
        // let newG = g < avg ? 0 : 255;
        // let newB = b < avg ? 0 : 255;

        // r = Math.floor(newR)
        // g = Math.floor(newG)
        // b = Math.floor(newB)
        // let hexR = r.toString(16).padStart(2, '0');
        // let hexG = g.toString(16).padStart(2, '0');
        // let hexB = b.toString(16).padStart(2, '0');

        // 将这些十六进制值连接起来。
        //let hexColor = `#${hexR}${hexG}${hexB}`;
        console.log(hexColor)
        resultIconEle.style.background = color

        resultIconEle.style.color = hexColor
        console.dir(resultIconEle)

        this.setState({currentColor: color, fontColor: hexColor})
    }
    handleIconSelect = (e) => {
        let name

        if (e.target.tagName === "svg") {
            name = e.target.dataset.icon
        } else if (e.target.tagName === "DIV") {
            name = e.target.children[0].children[0].dataset.icon
        }

        this.setState({open: false, currentIcon: name})
    }
    handleIconSelectOpen = (e) => {
        // console.log(e)
        this.setState({open: e})
    }

    render() {
        const {open, currentIcon} = this.state
        const {groups} = this.props

        const content = (
            <div onClick={this.handleIconSelect}>
                {
                    Object.keys(icons).map((e) => {
                        //console.log(e)
                        return <div className="iconSelector" key={e}>{icons[e]}</div>
                    })
                }
            </div>
        )

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

                            <span>选择图标：</span>
                            <input type="color" defaultValue="#ffffff" className="selectColor"
                                   onChange={this.handleColorSelect}/>

                            <Popover
                                content={content}
                                trigger="click"
                                open={open}
                                placement="right"
                                onOpenChange={this.handleIconSelectOpen}
                            >
                                <span>&nbsp;+&nbsp;</span>
                                {icons[currentIcon]}

                            </Popover>
                            <span>&nbsp;=</span>
                            {
                                <span ref={c => this.resultIconEle = c} className="resultIcon">
                                    {icons[currentIcon]}
                                </span>
                            }

                            {/*<Select onChange={e => this.handleIconSelect(e)} defaultValue="smile">*/}
                            {/*    {*/}
                            {/*        icons.map((v) => {*/}
                            {/*            return <Option key={v.name} value={v.name}>{v.ele}</Option>*/}
                            {/*        })*/}
                            {/*    }*/}
                            {/*</Select>*/}

                            <button onClick={this.addTodo} className="add" type='button'>添加事项</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default Header;