import React from 'react'
import { Button,Avatar,Typography } from 'antd'
import styled from 'styled-components'
import { auth } from '../../Filebase/config'
import {AuthContext } from "../../context/AuthProvier"
const WrapperStyled = styled.div`
        display:flex;
        justify-content:space-between;
        padding:12px 16px;
        border-bottom:1px solid #ccc;

        .usermain{
            display:flex;
            align-items:center;
            
        }
        .username{
            color:white;
            margin-left:10px;
        }

        @media (max-width: 768px){
            flex-direction: column;
              
            .username{
                font-weight: bold;
               
            }
        }

`



export default function UserInfo() {
    const {user} = React.useContext(AuthContext)
      
    return (
        <WrapperStyled>
            <div className="usermain">
                <Avatar src={user.photoURL}>{user.photoURL ? '' : user.displayName?.charAt(0)?.toUpperCase()}</Avatar>
                <Typography.Text className="username">{user.displayName}</Typography.Text>
            </div>
            <Button ghost onClick={( ) =>auth.signOut() }>sign out </Button>
        </WrapperStyled>
    )
}
