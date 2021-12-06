import React from "react";
import { useNavigate } from "react-router-dom";
import { auth ,db} from "../Filebase/config";
import { useState } from "react";
import { Spin } from "antd";
import { collection, query, where, getDocs } from "firebase/firestore";

export const AuthContext = React.createContext();

function AuthProvier({ children }) {
  const [user, setUser] = useState({});
  const history = useNavigate();
  const [ loading,setLoading] = useState(true);



  React.useEffect(() => {
   auth.onAuthStateChanged((user) => {
   

     if (user) {
          const { displayName, uid, email, photoURL} = user;
          
            if(user.providerData[0].providerId==='facebook.com'){
              
              setUser({
                displayName,
                uid,
                email,
                photoURL,
                
              })
            }else{
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
            }
         

          setLoading(false);
          history("/");
    
   
      } else{
        setLoading(false);
          history("/login");
      }
    });


  }, [history]);

      



  return (
    <AuthContext.Provider value={{ user,setUser }}>
        
        {loading ? <Spin></Spin> :children}
        
        </AuthContext.Provider>
  );
}

export default AuthProvier;
