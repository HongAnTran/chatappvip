import { Col, Row } from 'antd'
import React from 'react'
import UserInfo  from './UserInfo'
import RoomList  from './RoomList'
import styled from 'styled-components'
const SidebarStyles =  styled.div`
        background:#1890ff;
      
        height:100vh;
`;

export default function SideBar() {
    return (
        <SidebarStyles>

        <Row>
          <Col span={24}><UserInfo /></Col>
          <Col span={24}><RoomList /></Col>
        </Row>
        </SidebarStyles>
    )
}
