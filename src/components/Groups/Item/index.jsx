import React, {Component} from 'react';
import {Button, Popover, Select} from "antd";
import icons from "../../../globalData";
import './index.css'

const {Option} = Select

const colorOptions = [
    {label: '红色', value: 'red', hex: '#FF0000'},
    {label: '橙色', value: 'orange', hex: '#FFA500'},
    {label: '黄色', value: 'yellow', hex: '#FFFF00'},
    {label: '绿色', value: 'green', hex: '#008000'},
    {label: '蓝色', value: 'blue', hex: '#0000FF'},
    {label: '紫色', value: 'purple', hex: '#800080'},
];

class Index extends Component {


    state = {
        editIconOpen: false,
        currentIcon: 'smile',
        currentColor: '#ffffff',
        fontColor: '#000000',
    }
    editIcon = () => {
        let {item, groups} = this.props
        const {currentIcon, currentColor, fontColor} = this.state
        const icon = {currentIcon, currentColor, fontColor}

        item = {...item, ...icon}

        const newGroups = groups.map((v) => {
            if (v.id === item.id) {
                return item
            } else {
                return v
            }

        })
        this.props.updateGroup(newGroups)
    }

    editGroup = (item) => {
        const {newNameEle} = this
        const {groups} = this.props
        const oldName = item.name
        const id = item.id
        const newName = newNameEle.value
        if (oldName === newName.trim() || newName.trim() === "") {
            return;
        }

        if (newName.length >= 15) {
            alert("名字太长啦！")
            return
        }

        //修改组信息
        const newGroups = groups.map((item) => {
            if (item.id === id) {
                return {...item, name: newName}
            } else {
                return item
            }
        })

        this.props.updateGroup(newGroups)

    }
    deleteGroup = (id) => {
        const {groups} = this.props
        if (groups.length === 1) {
            alert("只剩一个分组了不能再删了")
            return;
        }
        if (!window.confirm('是否删除？')) {
            return
        }
        const newGroups = groups.filter((item) => {

            return item.id !== id
        })
        this.props.updateGroup(newGroups)

    }

    //下拉框选择颜色
    handleChangeColor1 = (e) => {
        const {resultIconEle} = this
        resultIconEle.style.background = e
        resultIconEle.style.color = "#000000"
        // console.log(e, '008000', e === '008000')
        if (e === '#008000' || e === '#0000FF' || e === '#800080') {
            resultIconEle.style.color = "#ffffff"
            this.setState({currentColor: e, fontColor: "#ffffff"})
            return
        }
        this.setState({currentColor: e, fontColor: "#000000"})

    }
    handleChangeColor2 = (e) => {
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

        resultIconEle.style.background = color
        resultIconEle.style.color = hexColor

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

    render() {
        const {item} = this.props
        const {currentIcon} = this.state
        //图标列表
        const iconsContent = (
            <div onClick={this.handleIconSelect}>
                {
                    Object.keys(icons).map((e) => {
                        //console.log(e)
                        return <div className="iconSelector" key={e}>{icons[e]}</div>
                    })
                }
            </div>
        )
        //颜色选择
        const content = (
            <div>
                <Select defaultValue="请选择" style={{width: 120}} onChange={this.handleChangeColor1}>
                    {colorOptions.map((option) => (
                        <Option key={option.value} value={option.hex} style={{backgroundColor: option.hex}}>
                            {option.label}
                        </Option>
                    ))}
                </Select>
                <div style={{display: 'inline-block', position: 'relative'}}>
                    更多
                    <input style={{opacity: '0', position: 'absolute', left: '0'}} type="color" defaultValue="#ffffff"
                           className="selectColor"
                           onChange={this.handleChangeColor2}/>
                </div>
                <Popover
                    content={iconsContent}
                    trigger="click"
                    placement="left"
                >
                    <span>&nbsp;+&nbsp;</span>
                    {icons[currentIcon]}

                </Popover>
                <span>&nbsp;=</span>

                <span ref={c => this.resultIconEle = c} className="resultIcon">
                    {icons[currentIcon]}
                </span>
                <Button onClick={() => {
                    this.editIcon()
                }} type={"default"}>修改
                </Button>

            </div>
        )
        return (
            <div className="content">

                <span className="resultIcon" style={{
                    background: item.currentColor,
                    color: item.fontColor
                }}>{icons[item.currentIcon]}</span>

                <input ref={c => this.newNameEle = c} className="input" type="text"
                       defaultValue={item.name}/>
                <Popover
                    content={content}
                    trigger="click"
                    placement="bottom"
                    onOpenChange={this.change}
                >
                    <Button type="default">修改图标
                    </Button>
                </Popover>

                <Button onClick={() => {
                    this.editGroup(item)
                }} type={"primary"}>完成
                </Button>

                <Button onClick={() => {
                    this.deleteGroup(item.id)
                }} danger type={"primary"}>删除
                </Button>
            </div>
        );
    }
}

export default Index;