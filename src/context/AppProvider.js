import React from 'react'
import useFirestore from '../hook/useFirestore'
import {AuthContext} from "./AuthProvier"

export const AppContext = React.createContext()

export default function AppProvider({children}) {
             const [onSignUp , setOnSignUp] = React.useState(false)
             const [onLogin , setOnLogin] = React.useState(false)
        const [isAddRoomVisible,SetisAddRoomVisible] = React.useState(false)
        const [selectedRoomId,setSelectedRoomId] = React.useState('')
        const [isInviteMemberVisible, setIsInviteMemberVisible] = React.useState(false);
        

    const {user} = React.useContext(AuthContext)

    const roomConditions = React.useMemo(() => {
        return {
            fieldName:'members',
            operator:'array-contains',
            compareValue:user.uid
        }
    },[user.uid])

    // const {rooms,selectedRoomId} = React.useContext(AppContext)
  
    const rooms = useFirestore('rooms' ,roomConditions)

 const selectedRoom =  React.useMemo(() => {
     return rooms.find(room => room.id === selectedRoomId) || {}
 },[selectedRoomId,rooms])

    const menberConditions = React.useMemo(() => {
        return {
            fieldName:'uid',
            operator:'in',
            compareValue:selectedRoom.members,
        }
    },[selectedRoom.members])

    const members = useFirestore('users' , menberConditions)




           
            
 

          
    

    return (
        <AppContext.Provider value={{
            rooms , isAddRoomVisible,SetisAddRoomVisible,selectedRoomId,
            setSelectedRoomId,selectedRoom,members,
            isInviteMemberVisible, setIsInviteMemberVisible,
            onSignUp,setOnSignUp,onLogin,setOnLogin,
            }}>
                {children}
        </AppContext.Provider>
    )
}
