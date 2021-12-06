import React, { useContext } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth,db } from "../../Filebase/config";
import { Modal, Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { AppContext } from "../../context/AppProvider";
import { AuthContext } from "../../context/AuthProvier";
export default function LoginWithPass() {
  const { setUser } = React.useContext(AuthContext);
  const { onLogin, setOnLogin } = useContext(AppContext);
  const form = Form.useForm();

  const handleOk = () => {
    setOnLogin(false);
  };

  const handleCancel = () => {
    setOnLogin(false);
  };

  const onFinish = async () => {
    const { email, password } = form[0].getFieldValue();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const { user: { uid,}} = userCredential;
        const q = query(collection(db, "users"), where("uid", "==", uid));
        const querySnapshot =  getDocs(q);

        querySnapshot.then(docs => {
          docs.forEach(doc => {
              const {displayName,uid,email,photoURL} = doc.data();
              setUser({
                displayName,
                email,
                photoURL,
                uid,
               });
               
               
              })
            })
            setOnLogin(false)
            form[0].resetFields()


      
      })
      .catch((error) => {
        alert("tài khoản hoặc mật khẩu không đúng");
      });
  };
  return (
    <>
      <Modal
        title="Đăng Nhập"
        visible={onLogin}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form[0]}
          layout="vertical"
          name="Login"
          className="login-form"
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
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
              },
              {
                min: 6,
                message: "Password must be at least 6 characters ",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item shouldUpdate>
            <Button type="primary" htmlType="submit">
              Đăng Nhập
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
