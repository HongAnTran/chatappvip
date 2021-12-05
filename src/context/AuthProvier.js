import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../Filebase/config";
import { useState } from "react";
import { Spin } from "antd";

export const AuthContext = React.createContext();

function AuthProvier({ children }) {
  const [user, setUser] = useState({});
  const history = useNavigate();
  const [ loading,setLoading] = useState(true);



  React.useEffect(() => {
   auth.onAuthStateChanged((user) => {
        if (user) {
        const { displayName, uid, email, photoURL} = user;
        setUser({
          displayName,
          uid,
          email,
          photoURL,
          
        });
        setLoading(false);
        history("/");
      }else{
        setLoading(false);

          history("/login");
      }
    });


  }, [history]);

      



  return (
    <AuthContext.Provider value={{ user }}>
        
        {loading ? <Spin></Spin> :children}
        
        </AuthContext.Provider>
  );
}

export default AuthProvier;
