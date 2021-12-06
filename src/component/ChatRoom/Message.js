import React from 'react'
import { Avatar ,Typography } from 'antd'
import styled  from 'styled-components'
import { formatRelative } from 'date-fns/esm';
const WrapperStyled = styled.div`
        margin-bottom: 12px;
        padding: 4px;
         padding-left: 12px;
        display: flex;
        border-bottom: 1px solid rgb(230, 230, 230);
        .author{
            color: #fff;
            font-weight: bold;
        }
        .displayname{
            margin-left: 5px;
            font-weight: bold;
            color: #fff;

        }
        .date{
            margin-left: 10px;
            font-size: 12px;
            color: #000; 
        }
        .content{
            color: #fff;
        }

        .messageStyledchat{
          background-color: 	#1890ff;
            border-radius: 12px;
            padding:6px;   
        }
     

      

`

function formatDate(seconds) {
    
    let formattedDate = '';
  
    if (seconds) {
      formattedDate = formatRelative(new Date(seconds * 1000), new Date());
  
      formattedDate =
        formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    }
  
    return formattedDate;
  }
  export default    function Message({ text, displayName, createdAt, photoURL}) {
   
      
    return (
      <WrapperStyled>
           <Avatar size="large" src={photoURL} className="avt_mess" style={{marginRight:12,flexShrink:0}}>
            {photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}
          </Avatar>
        <div className="messageStyledchat"   >
         
          <Typography.Text className='author'>{displayName}</Typography.Text>
          <Typography.Text className='date'>
            {formatDate(createdAt?.seconds)}
          </Typography.Text>

          <div style={{display: 'flex', flexDirection: 'column'}}>
          <Typography.Text className='content'>{text}</Typography.Text>
          
        </div>
        </div>
        
        
      </WrapperStyled>
    );
  }
