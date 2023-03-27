import React, {Component} from 'react';
import PubSub from "pubsub-js"
import './index.css'
class Right extends Component {
    state={
        todos:[
            //测试数据
            {id:10000001,plane:'吃饭1',time:'2000-2-2 20:20',done:true},
            {id:10000002,plane:'吃饭22222',time:'2023-3-24 20:20',done:false},
            {id:10000003,plane:'吃饭3',time:'2000-2-2 20:20',done:true},
            {id:10000004,plane:'打游戏',time:'2000-2-2 20:20',done:false}
        ],
        showTodos:[],
        edit:{state:false,item:''},
        onMouse:false
    }
    constructor(props) {
        super(props);
        //this.state.todos=JSON.parse(localStorage.getItem("todos"))
        this.state.showTodos=this.state.todos
    }

    componentDidMount() {


        this.token1=PubSub.subscribe('addTodo',(msg,data)=>{
            this.addTodo(data)
        })
        this.token2=PubSub.subscribe('showNowTodo',(msg,data)=>{

            const {todos}=this.state
            const newTodo = todos.filter((item)=>{
                return new Date(item.time).toLocaleDateString()===new Date(data.time).toLocaleDateString()
            })
            this.setState({showTodos: newTodo})

        })
        this.token3=PubSub.subscribe('showAllTodo',(msg,data)=>{
            this.setState({showTodos: this.state.todos})

        })
        this.token4=PubSub.subscribe('showDoneTodo',(msg,data)=>{

            const {todos}=this.state
            const newTdo=todos.filter((item)=>{
                return item.done===true
            })

            this.setState({showTodos: newTdo})

        })
    }
    componentWillUnmount() {  //取消订阅
        PubSub.unsubscribe(this.token1)
        PubSub.unsubscribe(this.token2)
        PubSub.unsubscribe(this.token3)
        PubSub.unsubscribe(this.token4)
    }

    addTodo=(todo)=>{
        const {todos}=this.state
        if(todos.length===0){
            todo["id"]=10000001
        }else{
            const id_arr=todos.map(item=>item.id)
            todo["id"]=Math.max(...id_arr)+1
        }
        const newTodos=[todo,...todos]
        this.save()
        this.setState({showTodos: newTodos,todos: newTodos})

    }
    doneTodo=(id)=>{
        const {showTodos,todos}=this.state
        const newTodo = showTodos.map((item)=>{
            if(item.id===id){

                return {...item,done:!item.done}
            }else{
                return item
            }
        })

        const newTodos=todos.map((j)=>{
            if(j.id===id){
                return {...j,done:!j.done}
            }else{
                return j
            }
        })

        this.setState({showTodos: newTodo,todos:newTodos})
        this.save()
    }
    edit=(item)=>{
        this.setState({edit:{state:true,item}})
    }
    editTodo=(data)=>{
        const {planeEle,newTimeEle}=this
        const {todos}=this.state

        const newTodo = todos.map((item)=>{
            if(item.id===data.id){
                if(newTimeEle.value!==''){
                    return {...item,plane:planeEle.value,time:newTimeEle.value.replace("T",' ')}
                }else{
                    return {...item,plane:planeEle.value }
                }
            }else{
                return item
            }
        })
        this.save()
        this.setState({showTodos: newTodo,todos: newTodo,edit:{state:false}})
        console.log(planeEle.value,newTimeEle.value)
    }

    deleteTodo=(data)=>{
        if(!window.confirm('是否删除？')){
            return
        }
        const {showTodos,todos}=this.state
        const newTodo = showTodos.filter((item)=>{
            return item.id!==data.id
        })

        const newTodos=todos.filter(item=>item.id!==data.id)
        this.save()
        this.setState({showTodos: newTodo,todos: newTodos})
    }

    save() {
        localStorage.setItem("todos",JSON.stringify(this.state.todos))
    }
    handlerMouse=(flag,item1)=>{
        const {showTodos}=this.state
        const newTodo = showTodos.map((item)=>{
            if(item.id===item1.id){
                return {...item,onMouse:flag}
            }else{
                return item
            }
        })

        this.setState({showTodos: newTodo})


    }

    render() {
        const {showTodos,edit}=this.state
        console.log(this.state.todos,showTodos)
        return (
            <div className="right">
                <span id="title">所有</span>
                {
                    edit.state?<div>
                            <textarea ref={(c)=>{this.planeEle=c}} className="edit_area" name="" id="" defaultValue={edit.item.plane}></textarea>
                            <div >该计划的时间为：<span>{edit.item.time}</span> <br/>

                                点击修改新时间<input ref={(c)=>{this.newTimeEle=c}}  className="time" type="datetime-local" />
                                <button onClick={()=>{this.editTodo(edit.item)}} className="bt_done" style={{float:'right'}}>完成</button></div>
                        </div>:
                        showTodos.map((item)=>{
                            return  <div className="item" key={item.id} onMouseEnter={(e)=>{this.handlerMouse(true,item)}} onMouseLeave={()=>{this.handlerMouse(false,item)}}>

                                <div className="content">{item.plane}</div>
                                <span className="time">{item.time}</span><span className="done" style={{visibility:item.done?'':'hidden'}}>√</span>
                                <div className="btns" style={{display:item.onMouse?'block':'none'}}>
                                    <button onClick={()=>{this.edit(item)}} className="bt_edit" style={{display:item.done?'none':''}} >编辑</button>
                                    <button onClick={()=>{this.doneTodo(item.id)}} className="bt_done"  >{item.done?'取消':'完成'}</button>
                                    <button onClick={()=>{this.deleteTodo(item)}} className="bt_del">删除</button>
                                </div>
                            </div>
                        })
                }

            </div>
        );
    }


}

export default Right;
