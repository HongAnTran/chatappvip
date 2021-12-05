import React from 'react'
import ChatWindow from './ChatWindow'
import SideBar from './SideBar'
import { Row ,Col} from 'antd'
function ChatRoom() {
    return (
        <Row>
            <Col span={6}>
            
           <SideBar />
            </Col> 

            <Col span={18}>
           <ChatWindow />
            
             </ Col> 
           
        </Row>
    )
}

export default ChatRoom
