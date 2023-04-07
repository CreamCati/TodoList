import React, {useContext, useRef, useState} from 'react';
import './index.css'
import {Button, Descriptions, Input, Popover, Select, Space, Table} from "antd";
import {MyContext} from "../App";
import icons from "../globalData";
import {CloseCircleOutlined} from "@ant-design/icons";

const {Option} = Select

const ManageGroup = () => {
    const {groups, setGroups} = useContext(MyContext).groups
    const [data, setData] = useState()
    const [icon, setIcon] = useState({icon: "folder-add", bgColor: '#fff', fontColor: '#000'})
    const refInput = useRef()
    const [key,setKey] = useState(0)
    React.useEffect(() => {
        setKey(key+1)
    },[data])
    function editGroup(e) {
        // setData()
        // setIcon()
        // setTimeout(() => {
            setData(e)
            setIcon({icon: e.icon, bgColor: e.bgColor, fontColor: e.fontColor})
        // })
    }

    const iconsContent = (
        <div>
            {
                Object.keys(icons).map((e) => {
                    return <div onClick={handleIconSelect} className="iconSelector" key={e}>{icons[e]}</div>
                })
            }
        </div>
    )

    function handleChangeColor1(e) {
        let fontColor
        switch (e) {
            case '#FFA500':
                fontColor = '#000'
                break
            case '#FFFF00':
                fontColor = '#000'
                break
            case '#E5E5E5':
                fontColor = '#000'
                break
            case '':
                fontColor = '#000'
                break
            default:
                fontColor = '#fff'
        }
        setIcon({...icon, bgColor: e, fontColor: fontColor})
    }

    function handleIconSelect(e) {
        const iconName = e.target.dataset.icon
        if (iconName) {
            setIcon({...icon, icon: iconName})
        }
    }

    const colorOptions = [
        {label: '红色', value: 'red', hex: '#FF0000'},
        {label: '橙色', value: 'orange', hex: '#FFA500'},
        {label: '黄色', value: 'yellow', hex: '#FFFF00'},
        {label: '绿色', value: 'green', hex: '#008000'},
        {label: '蓝色', value: 'blue', hex: '#0000FF'},
        {label: '紫色', value: 'purple', hex: '#800080'},
        {label: '灰色', value: 'gary', hex: '#E5E5E5'},
        {label: '无背景色', value: 'none', hex: ''}
    ];
    const columns = [
        {
            title: '图标',
            dataIndex: 'icon',
            key: 'icon',
            width: '100px',
            render: (_, record) => (
                <span className={"icon"}
                      style={{backgroundColor: record.bgColor, color: record.fontColor}}>{icons[record.icon]}</span>
            )
        },
        {
            title: '组名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a><Button onClick={() => {
                        editGroup(record)
                    }} type={"default"}>修改</Button></a>
                    <a><Button danger onClick={() => {
                        delGroup(record)
                    }}>Delete</Button></a>
                </Space>
            )
        }
    ];

    //修改组数据
    function onClick() {
        const newData = {
            ...data,
            name: refInput.current.input.value,
            icon: icon.icon,
            bgColor: icon.bgColor,
            fontColor: icon.fontColor
        }
        const newGroup = groups.map((v) => {
            if (v.key === newData.key) {
                return newData
            } else {
                return v
            }
        })
        setGroups(newGroup)
    }

    function delGroup(data) {
        if (!window.confirm('是否删除？')) {
            return
        }
        const newGroup = groups.filter((v) => {
            return v.key !== data.key
        })
        console.log(newGroup)
        setGroups(newGroup)
    }

    function closeA() {
        setData()
    }

    return (
        <div className={"manageGroup"} key={key}>
            <Table dataSource={groups} columns={columns}/>
            {
                data ?
                    <div className={"edit"}>
                        <p onClick={closeA}><CloseCircleOutlined className={"icon_close"}/></p>
                        <Descriptions title="">
                            <Descriptions.Item label="">
                                <span>修改图标：</span>
                                <Select style={{width: 120}} defaultValue={"选择颜色"} onChange={handleChangeColor1}>
                                    {
                                        colorOptions.map((option) => (
                                            <Option key={option.value} value={option.hex}
                                                    style={{backgroundColor: option.hex}}>
                                                <span>{option.label}</span>
                                            </Option>
                                        ))
                                    }
                                </Select>
                                <Popover
                                    content={iconsContent}
                                    trigger="hover"
                                    placement="bottom"
                                >
                                    <span className={"icon"} style={{
                                        backgroundColor: icon.bgColor,
                                        color: icon.fontColor
                                    }}>{icons[icon.icon]}</span>
                                </Popover>
                            </Descriptions.Item>
                            <Descriptions.Item>
                                <span>修改分组：</span>
                                <Input style={{width: '80%'}} ref={refInput} defaultValue={data.name}/>
                            </Descriptions.Item>
                        </Descriptions>
                        <Button className={"edit_btn"} type={"primary"} onClick={onClick}>修改</Button>
                    </div>
                    :
                    <div></div>
            }
        </div>
    );
};

export default ManageGroup;