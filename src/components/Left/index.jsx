import React, {Component} from 'react';
import './index.css'

class Left extends Component {


    click=(e)=>{
        if(e.target.tagName!=='LI'){
            return
        }

        const li=e.target
        const text = li.innerText
        for (let i = 0; i < li.parentElement.children.length; i++) {
            li.parentElement.children[i].style=''
        }
        li.style='border-right:white'

        // eslint-disable-next-line default-case
        switch (text){
            case "今日":
                const now= Date.now()
                this.props.showNowList(now)

                break;
            case "所有":
                this.props.showAllList()
                console.log("所有")

                break;
            case "已完成":
                this.props.showDoneList()
                console.log("已完成")

                break;

        }

    }

    render() {
        const lists=[{title:"今日",id:'101'},{title:"所有",id:'102'},{title:"已完成",id:'103'},];

        return (
            <div className="left" >
                <ul onClick={this.click} >
                    {
                        lists.map((item)=>{
                            return <li key={item.id}>{item.title}</li>
                        })
                    }
                </ul>
            </div>
        );
    }
}

export default Left;