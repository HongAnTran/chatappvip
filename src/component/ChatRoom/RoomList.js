import React from 'react'
import {Collapse,Typography ,Button} from 'antd'
import styled from 'styled-components'
import {PlusSquareOutlined} from '@ant-design/icons'
import { AppContext } from '../../context/AppProvider'

const {Panel} = Collapse

const PanelStyle = styled(Panel)`
 &&& {
     .ant-collapse-header {
            color:white;
     }
     .ant-collapse-content-box{
         padding : 0 40px;
     } 
     .add-room{
            color:  white;
            padding: 0;
     }

     @media (max-width: 768px){
            .add-room{
                transform: translateX(-22px);
            }
     }
   
 }
`

const LinkStyle = styled(Typography.Link)`


&&&{
    display:block;
            margin-bottom:12px;
             color:#fff;
             font-weight: bold;
             border: 1px solid #fff;

             
            
    }
    :hover{
        color:#000 !important;
        }
    
`

export default function RoomList() {
    
const {rooms,SetisAddRoomVisible,setSelectedRoomId}  = React.useContext(AppContext)

const handleAddRoom = ()=>{
SetisAddRoomVisible(true)
}
    return (

        <Collapse ghost defaultActiveKey={['1']}>
            <PanelStyle header="Danh sách các phòng" key="1">
               {
                    rooms.map((room) =>{
                        return (
                            <LinkStyle key={room.id} 
                                onClick={() =>setSelectedRoomId(room.id)}
                            >{room.name}</LinkStyle>
                        )
                    })

               }
                <Button type="text" icon={<PlusSquareOutlined />} className="add-room"
                    onClick={handleAddRoom}
                >Thêm Phòng</Button>
            </PanelStyle>
        </Collapse>
    )
}
