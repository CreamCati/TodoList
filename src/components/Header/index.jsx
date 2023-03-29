import React, {Component} from 'react';
import PubSub from 'pubsub-js'
import './index.css'
import Logo from './img/logo.jpg'

class Header extends Component {

    state={
        selectItem:''
    }

    addTodo=()=>{
        let {selectItem} = this.state
        const {formEle} = this

        if(selectItem === ""){
            selectItem = "默认分组"
        }

        const plane = this.input.value
        const time = this.time.value.replace("T"," ")

        if(time !== ''&&plane !== ''){
            const data={plane, time, done:false, group:selectItem}
            PubSub.publish('addTodo', data);
            formEle.reset()
        }else{
            alert("未输入具体计划或未选择日期")
        }
    }

    selectItem = (e)=>{
        const {groups} = this.props
        const index = e.target.selectedIndex

        // eslint-disable-next-line react/no-direct-mutation-state
        this.state.selectItem = groups[index].name

    }
    render() {
        const {groups} = this.props
        return (
            <div className="header">
                <img className="logo" src={Logo} alt=""/>
                <form ref={(c)=>{this.formEle=c}}>
                    <div style={{display:'block'}}>
                        <label>
                            <input ref={c => this.input=c} className="input" type="text" placeholder="输入自己的计划"/>
                        </label>
                        <label>
                            <input ref={c => this.time=c} className="date" type="datetime-local"/>
                        </label>
                        <div className="group" style={{marginLeft:'400px',background:''}}>
                            <span>选择分组：</span>
                            <select name="groups" onChange={e => this.selectItem(e)} >
                                {
                                    groups.map((item) => {
                                        return <option key = {item.id} value = {item.name}>{item.name}</option>
                                    })
                                }
                            </select>
                            <button onClick={this.addTodo} className = "add" type = 'button'>添加事项</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default Header;