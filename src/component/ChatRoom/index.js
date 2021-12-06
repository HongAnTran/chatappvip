import React from 'react'
import ChatWindow from './ChatWindow'
import SideBar from './SideBar'
import { Row ,Col} from 'antd'
function ChatRoom() {
    return (
        <Row>
            <Col xs={8} sm={8} md={6} lg={6} xl={6}>
            
           <SideBar />
            </Col> 

            <Col xs={16} sm={16} md={18} lg={18} xl={18}>
           <ChatWindow />
            
             </ Col> 
           
        </Row>
    )
}

export default ChatRoom
