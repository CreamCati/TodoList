import React, {Component} from 'react';
import './index.css'
class Groups extends Component {



    edit=(item,e)=>{
        const {groups}=this.props
        const name= e.target.previousSibling.value
        const id=item.id

        if(item.name===name.trim()||name.trim()===""){
            e.target.previousSibling.value=item.name
            return;
        }

        if(name.length>=15){
            alert("名字太长啦！")
            return
        }
        const newGroups=groups.map((item)=>{
            if(item.id===id){
                return {...item,name:name}
            }else{
                return item
            }
        })
        this.props.appEditGroups(newGroups)
        localStorage.setItem("groups",JSON.stringify(newGroups))
        alert("修改成功")

    }

    deleteGroup=(id)=>{
        const {groups}=this.props
        if(groups.length===1){
            alert("只剩一个分组了不能再删了")
            return;
        }

        if(!window.confirm('是否删除？')){
            return
        }

        const newGroups = groups.filter((item)=>{
            return item.id!==id
        })
        this.props.appEditGroups(newGroups)
        localStorage.setItem("groups",JSON.stringify(newGroups))
    }

    addGroup=()=>{
        const {nameEle}=this
        const {groups}=this.props
        const name=nameEle.value.trim()

        if(name===""){
            return
        }
        if(name.length>=15){
            alert("名字太长啦！")
            return
        }
        const id_arr=groups.map(item=>item.id)
        const group={}
        group.id=Math.max(...id_arr)+1
        group.name=name
        console.log("新增",group,groups)
        const newGroups=[...groups,group]

        this.props.appEditGroups(newGroups)
        localStorage.setItem("groups",JSON.stringify(newGroups))

        nameEle.value=''
    }
    render() {
        const {groups}=this.props
        //console.log("group",groups)
        return (
            <div  className="groups">
                {
                    groups.map((item)=>{
                        return <div key={item.id}>
                                <input className="input" type="text" defaultValue={item.name}/>
                                <button onClick={(e)=>{this.edit(item,e)}} className="bt_edit">完成</button>
                                <button onClick={()=>{this.deleteGroup(item.id)}} className="bt_del">删除</button>

                        </div>
                    })
                }
                <input ref={(c)=>{this.nameEle=c}} className="newGroup" type="text" placeholder="此处添加新的分组"/>
                <button className="bt_edit" onClick={this.addGroup}>添加新分组</button>
            </div>
        );
    }
}

export default Groups;