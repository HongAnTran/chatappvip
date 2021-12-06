import React, { useContext } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Filebase/config";
import { Modal, Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { AppContext } from "../../context/AppProvider";
import {addDocument,generateKeywords} from "../../Filebase/Services"
import {  AuthContext} from "../../context/AuthProvier"



export default function SignUp() {
    
    const {setUser} = React.useContext(AuthContext)
  const { onSignUp, setOnSignUp } = useContext(AppContext);
  const form = Form.useForm();

  const handleOk = () => {
    setOnSignUp(false);
  };

  const handleCancel = () => {
    setOnSignUp(false);
  };

  const onFinish = async () => {
      const {email, password,username} = form[0].getFieldValue()

           createUserWithEmailAndPassword(auth, email, password).then((user) => {
               const {user:{uid,}} = user
              
               addDocument('users' ,{
                             displayName: username,
                            email: email,
                            photoURL: null,
                            uid: uid,
                            providerID: "email/pass",
                            keywords: generateKeywords(username?.toLowerCase()),
               })
              
               setUser({
                displayName: username,
                email: email,
                photoURL: null,
                uid: uid,
                
               });
               
               setOnSignUp(false)
               form[0].resetFields()
               
             
           })
           .catch(error => {
                alert("Tài khoản này  đã được đăng kí trước đó ")
           })
  };
  return (
    <>
      <Modal
        title="Đăng Kí Tài Khoản"
        visible={onSignUp}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form[0]}
          layout="vertical"
          name="Sign Up"
          className="login-form"
          onFinish={onFinish}
        >
                <Form.Item
        name="username"
        label="User Name"
        
        rules={[
          {
            required: true,
            message: 'Please input your nickname!',
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
          <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
          <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
      </Form.Item>
         
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },{
                  min:6,
                  message: "Password must be at least 6 characters ",
              }
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
  

          <Form.Item shouldUpdate>
            <Button type="primary" htmlType="submit">
              Đăng kí
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
