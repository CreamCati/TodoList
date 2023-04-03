import React, {useState} from 'react';
import {
    CalendarOutlined,
    StarOutlined,
    FolderAddOutlined,
    WalletOutlined
} from '@ant-design/icons';
import {Button, Form, Input, Menu} from 'antd';
import {useHistory, useLocation, withRouter} from 'react-router-dom'
import './index.css'
import {MyContext} from "../App";

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
            getItem('今日任务', '/myDay', <WalletOutlined/>),
            getItem('已完成', '/done', <StarOutlined/>),
            getItem('所有任务', '/all', <CalendarOutlined/>)
        ],
        'group'
    ),
    getItem(
        '分组', 'group', null,
        [],
        'group'
    )
];

function randKey() {
    let result = ''
    let length = 10
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    const charactersLength = characters.length
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
}

const SideBar = () => {
    const [defaultGroups, setDefaultGroups] = useState(items)
    const {groups, setGroups} = React.useContext(MyContext).groups
    const [form1] = Form.useForm()
    const history = useHistory();

    React.useEffect(() => {
        const children = groups.map((v) => {
            return getItem(v.name, v.key, <CalendarOutlined/>)
        })
        defaultGroups[1].children = [...defaultGroups[1].children, ...children]
        setDefaultGroups([...defaultGroups])
    }, [])

    function onFinish(e) {
        const key = randKey()
        const Routers = [...groups, {name: e.group, key: key}]
        const newGroup = [...defaultGroups]

        newGroup[1].children = [...newGroup[1].children, getItem(e.group, key, <CalendarOutlined/>)]
        setDefaultGroups(newGroup)
        setGroups(Routers)
        form1.resetFields()
    }

    const onClick = (e) => {
        const title = e.domEvent.target.innerHTML
        const state = {title}
        history.push({pathname: e.key, state});
    };

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
                        },
                    ]}
                >
                    <Input placeholder="新建分组" suffix={
                        <Button htmlType="submit"><FolderAddOutlined/></Button>
                    }/>
                </Form.Item>
            </Form>
        </div>

    );
};

export default withRouter(SideBar);