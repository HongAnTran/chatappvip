import React from 'react'
import {Modal , Form,Input} from "antd"
import {AppContext} from "../../context/AppProvider"
import { addDocument } from '../../Filebase/Services';
import {AuthContext } from "../../context/AuthProvier"
export default function AddRoomModal() {
const {isAddRoomVisible,SetisAddRoomVisible} = React.useContext(AppContext)  

    
    const form = Form.useForm()
  
    const {user} = React.useContext(AuthContext)
    const handleOk = ()=>{
        // add new room to firestore 
        const {name,description} = form[0].getFieldValue()
        addDocument('rooms', {
                name,
                description,
                members:[user.uid]
        })
                form[0].resetFields()



            SetisAddRoomVisible(false)

    }

    const handleCancel = ()=>{
        form[0].resetFields()
        SetisAddRoomVisible(false)
        
    }
    return (
        <div>
            <Modal
                title='Tạo Phòng'
                visible ={isAddRoomVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
            <Form form={form[0]} layout='vertical'>
                <Form.Item label="Tên Phòng" name="name">
                        <Input placeholder="nhập tên phòng"/>
                </Form.Item>
                <Form.Item label="Mô tả" name="description">
                        <Input.TextArea placeholder="nhập tên phòng"/>
                </Form.Item>
            </Form>
            </Modal>
        </div>
    )
}
