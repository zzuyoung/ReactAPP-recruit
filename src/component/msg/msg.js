import React from 'react';
import { List, Badge } from 'antd-mobile'
import { connect } from 'react-redux'

@connect(
    state=>state
)

class Msg extends React.Component {
    getLast(arr) {
        return arr[arr.length - 1]
    }
    render() {
        const Item = List.Item
        const Brief = Item.Brief
        const userid = this.props.user._id
        const userinfo = this.props.chat.users
        // console.log(this.props)
        // 按照聊天用户分组，根据chatid
        const msgGroup = {}
        this.props.chat.chatmsg.forEach(v=>{
            msgGroup[v.chatid] = msgGroup[v.chatid] || []
            msgGroup[v.chatid].push(v)
        })
        console.log(msgGroup)
        const chatList = Object.values(msgGroup)
        
        console.log(chatList)
        
        // console.log(Object.values({name:'imooc',age:18}))
        return(
            <div>
               
                    {chatList.map(v => {
                        console.log(v)
                        const lastItem = this.getLast(v)
                        const targetId = v[0].from === userid ? v[0].to  : v[0].from
                    const unreadNum = v.filter(v => !v.read && v.to === userid).length //实时显示未读的消息
                        if (!userinfo[targetId]) {
                            return null
                        }
                        return (
                            <List key={lastItem._id}>
                                <Item
                                    extra={<Badge text={unreadNum}></Badge>}
                                    thumb={require(`../img/${userinfo[targetId].avatar}.png`)}
                                >
                                    {lastItem.content}
                                    <Brief>{userinfo[targetId].name}</Brief>
                                </Item>
                            </List>
                        )
                    })}
                
            </div>
        )
    }
}


export default Msg