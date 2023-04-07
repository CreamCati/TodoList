import React, {useState} from 'react';
import {Button, Form, Input, Menu, Popover} from 'antd';
import {useHistory, withRouter} from 'react-router-dom'
import './index.css'
import {MyContext} from "../App";
import {randKey} from "../utils";
import icons from '../globalData'

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const items = [
    getItem(
        '事项', 'todo', null,
        [
            getItem('今日任务', '/myDay', icons.wallet),
            getItem('已完成', '/done', icons.star),
            getItem('所有任务', '/all', icons.calendar)
        ],
        'group'
    ),
    getItem(
        '分组', 'group', null,
        [],
        'group'
    )
];


const SideBar = () => {
    const [defaultGroups, setDefaultGroups] = useState(items)
    //icon是name，icons是图标组  icons[icon]
    const [icon, setIcon] = useState("folder-add")
    const {groups, setGroups} = React.useContext(MyContext).groups
    const [form1] = Form.useForm()
    const history = useHistory();

    React.useEffect(() => {
        const children = groups.map((v) => {
            return getItem(v.name, v.key, <span className={"icon"} style={{
                backgroundColor: v.bgColor,
                color: v.fontColor
            }}>{icons[v.icon]}</span>)
        })
        defaultGroups[1].children = [...children]
        setDefaultGroups([...defaultGroups])
    }, [groups])

    function onFinish(e) {
        const key = '/' + randKey()
        const Routers = [...groups, {name: e.group, key: key, icon: icon,bgColor:'',fontColor: ''}]
        const newGroup = [...defaultGroups]

        newGroup[1].children = [...newGroup[1].children, getItem(e.group, key, icons[icon])]
        setDefaultGroups(newGroup)
        setGroups(Routers)
        form1.resetFields()
    }

    const onClick = (e) => {
        const state = e.key
        history.push({pathname: '/home' + e.key, state});
        console.log('/home' + e.key)
    }
    const onManageClick = () => {
        history.push('/manage');
    }

    function handleIconSelect(e) {
        const iconName = e.target.dataset.icon
        if (iconName) {
            setIcon(iconName)
        }
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
    return (
        <div className="SideBar">
            <Menu
                onClick={onClick}
                style={{
                    width: 256,
                }}
                mode="inline"
                items={defaultGroups}
            />

            <Form
                form={form1}
                style={{padding: '10px'}}
                onFinish={onFinish}
            >
                <Form.Item
                    name="group"
                    rules={[
                        {
                            required: true,
                            message: '填个组名吧'
                        },
                    ]}
                >
                    <Input placeholder="新建分组" suffix={
                        <Popover
                            content={iconsContent}
                            trigger="hover"
                            placement="bottom"
                        >
                            <Button htmlType="submit">{icons[icon]}</Button>
                        </Popover>
                    }/>
                </Form.Item>
            </Form>
            <Button className={"btn"} type={"primary"} key={"/manage"} onClick={onManageClick}>管理分组</Button>
        </div>
    );
};

export default withRouter(SideBar);