import React, { memo ,useRef,useEffect} from "react";
import styled from "styled-components";
import { Avatar, Button, Tooltip, Form, Input, Alert } from "antd";
import Message from './Message';
import { AuthContext } from "../../context/AuthProvier";
import { UserAddOutlined } from "@ant-design/icons";
import { AppContext } from "../../context/AppProvider";
import { addDocument } from "../../Filebase/Services";
import useFirestore from "../../hook/useFirestore"


const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  height: 56px;
  padding: 0 16px;
  align-items: center;
  border-bottom: 1px solid rgb(230, 230, 230);

  .header {
    &__info {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    &__title {
      margin: 0;
      font-weight: bold;
      font-size: 20px;
      
    }
    &__description {
      font-size: 12px;
    }
  }
`;
const ButtonGroupStyled = styled.div`
  display: flex;
  align-items: center;
`;
const WrapperStyled = styled.div`
  height: 100vh;
`;
const ContentStyled = styled.div`
  height: calc(100% - 56px);
  display: flex;
  flex-direction: column;
  padding: 12px 12px 12px 0;
  justify-content: flex-end;
`;
const FromStyled = styled(Form)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 2px 2px 0;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 2px;

  .ant-form-item {
    flex: 1;
    margin-bottom: 0;
  }

  .ant-form-item:nth-child(2) {
    flex: 0;
    margin-bottom: 0;
    cursor: pointer;
    
    .ant-form-item-control-input-content{
        position: relative;
      display: flex;
    }
  }
`;
const MessageListStyled = styled.div`
  max-height: 100%;
  overflow-y: auto;
`;


function ChatWindow() {
  const {
    user: { uid, photoURL, displayName },
  } = React.useContext(AuthContext);
  const inputRef = useRef(null);
  const messageListRef = useRef(null);


  const { selectedRoom, members, setIsInviteMemberVisible } =
    React.useContext(AppContext);

  const [inputValue, setInputValue] = React.useState("");
 
  const [form] = Form.useForm();



       

     

  const handleOnsubmit = async () => {
  
  

   if(inputValue){
    addDocument("messages", {
      text: inputValue,
      uid,
      photoURL,
      roomId: selectedRoom.id,
      displayName,
      // colorMessage,
    });
   }
   form.resetFields(["messages","img"]);
   
   setInputValue('');
  
    if (inputRef?.current) {
      setTimeout(() => {
        inputRef.current.focus();
      });
    }
  };



  const handleInputChange = (e) => {

   
    setInputValue(e.target.value);
  };

             
         



  const condition = React.useMemo(
    () => ({
      fieldName: 'roomId',
      operator: '==',
      compareValue: selectedRoom.id,
    }),
    [selectedRoom.id]
  );
  const messagesDB = useFirestore('messages',condition) 

  useEffect(() => {
    // scroll to bottom after message changed
    if (messageListRef?.current) {
      messageListRef.current.scrollTop =
        messageListRef.current.scrollHeight + 50;
    }
  }, [messagesDB]);
  return (
    <WrapperStyled>
      {selectedRoom.id ? (
        <>
          <HeaderStyled>
            <div className="header__info">
              <p className="header__title">{selectedRoom.name}</p>
              <span className="header__desciption">
                {selectedRoom.description}
              </span>
            </div>
            <ButtonGroupStyled>
              <Button
                icon={<UserAddOutlined />}
                type="text"
                onClick={() => setIsInviteMemberVisible(true)}
              >
                M???i{" "}
              </Button>

              <Avatar.Group size="small" maxCount={2}>
                {members.map((member) => {
                  return (
                    <Tooltip title={member.displayName} key={member.id}>
                      <Avatar src={member.photoURL}>
                        {member.photoURL
                          ? ""
                          : member.displayName?.charAt(0).toUpperCase()}
                      </Avatar>
                    </Tooltip>
                  );
                })}
              </Avatar.Group>
            </ButtonGroupStyled>
          </HeaderStyled>
          <ContentStyled>
            <MessageListStyled ref={messageListRef}>
            {messagesDB.map((mes) => (
                <Message
                  key={mes.id}
                  text={mes.text}
                  photoURL={mes.photoURL}
                  displayName={mes.displayName}
                  createdAt={mes.createdAt}
                  color={mes.colorMessage}
                  
                />
              ))}
            </MessageListStyled>

            <FromStyled form={form}>
              <Form.Item name="messages">
                <Input
                   ref={inputRef}
                  value={inputValue}
                  onChange={(e) => handleInputChange(e)}
                  onPressEnter={handleOnsubmit}
                  bordered={false}
                  autoComplete="off"
                  placeholder="nh???p chat"
                ></Input>
                  
              
              </Form.Item>

              <Button type="primary" onClick={handleOnsubmit}>
                G???i
              </Button>
            </FromStyled>
          </ContentStyled>
        </>
      ) : (
        <>
          <Alert
            message="h??y ch???n ph??ng"
            type="info"
            showIcon
            style={{ margin: 5 }}
          />
        </>
      )}
    </WrapperStyled>
  );
}

export default memo(ChatWindow);
